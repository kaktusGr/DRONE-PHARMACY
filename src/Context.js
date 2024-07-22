import { createContext, useState, useRef, useEffect } from 'react';

const Context = createContext();

const ContextProvider = (props) => {
    const [allMedications, setAllMedications] = useState([]);
    const [cartMedications, setCartMedications] = useState([]);
    const [cartItemsId, setCartItemsId] = useState([]);
    const [availability, setAvailability] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    const refPage = useRef(0);
    const [allPages, setAllPages] = useState(0);
    const [totalMed, setTotalMed] = useState(0);

    const [droneId, setDroneId] = useState();

    const urlFilters = {
        available: "status=AVAILABLE",
        sort: {
            nameAZ: "sort=name,asc",
            nameZA: "sort=name,desc",
            weightUp: "sort=weight,asc",
            weightDown: "sort=weight,desc",
        }
    };
    const [urlSelect, setUrlSelect] = useState(urlFilters.sort.nameAZ);
    const href = "http://localhost:8090/medication?size=6&page=";

    const [urlMedication, setUrlMedication] = useState(href + refPage.current + "&" + urlFilters.available + "&" + urlSelect);

    useEffect(() => {
        let ignore = false;
        fetch(urlMedication, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setAllPages(data.totalPages);
                    setTotalMed(data.totalElements);
                    updateWithCartInfo(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, [urlMedication, cartItemsId]);

    const updateWithCartInfo = (medications) => {
        const updateMedications = medications.map(med => {
            const isInCart = cartItemsId.some(item => item === med.id);
            if (isInCart) {
                return { ...med, status: "UNAVAILABLE" };
            } else {
                return { ...med, status: med.status };
            }
        });
        setAllMedications(updateMedications);
    }

    const toggleAvailable = (value) => {
        refPage.current = 0;
        setAvailability(value);
        setUrlMedication(value
            ? href + refPage.current + "&" + urlFilters.available + "&" + urlSelect
            : href + refPage.current + "&" + urlSelect);
    }

    const selectSort = (value) => {
        refPage.current = 0;
        for (let key in urlFilters.sort) {
            if (value === key) {
                setUrlMedication(availability
                    ? href + refPage.current + "&" + urlFilters.available + "&" + urlFilters.sort[value]
                    : href + refPage.current + "&" + urlFilters.sort[value]);
                setUrlSelect(urlFilters.sort[value]);
            }
        }
    }

    const currentPage = (value) => {
        switch (value) {
            case "left":
                refPage.current = refPage.current === 0 ? refPage.current = 0 : refPage.current - 1;
                break;
            case "right":
                refPage.current = refPage.current === allPages - 1
                    ? allPages - 1 : refPage.current + 1;
                break;
            default: refPage.current = value;
        }
        setUrlMedication(availability
            ? href + refPage.current + "&" + urlFilters.available + "&" + urlSelect
            : href + refPage.current + "&" + urlSelect);
    }

    const append = (id) => {
        if (cartItemsId.length === 0) {
            setCartItemsId([id]);
        } else {
            const indexCart = cartItemsId.findIndex(value => value === id);
            if (indexCart < 0) {
                setCartItemsId(prevIDs => [...prevIDs, id]);
            }
        }
    }

    const remove = (ids) => {
        const idsArray = Array.isArray(ids) ? ids : [ids];
        const newCart = cartItemsId.filter(item => !idsArray.includes(item));
        setCartItemsId(newCart);
        const filteredData = cartMedications.filter(med => newCart.includes(med.id));
        setCartMedications(filteredData);
        setSelectedItems(filteredData.filter(med => med.isSelected));
    }

    const value = {
        allMedications,
        cartMedications,
        setCartMedications,
        cartItemsId,
        selectedItems,
        setSelectedItems,
        availability,
        toggleAvailable,
        selectSort,
        currentPage,
        refPage: refPage.current,
        allPages,
        totalMed,
        append,
        remove,
        droneId,
        setDroneId,
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };
