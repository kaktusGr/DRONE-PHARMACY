import { createContext, useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Context = createContext();

const ContextProvider = (props) => {
    const [allMedications, setAllMedications] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [availability, setAvailability] = useState(true);

    const refPage = useRef(0);
    const [allPages, setAllPages] = useState(0);
    const [totalMed, setTotalMed] = useState(0);

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
    }, [urlMedication]);

    const location = useLocation();
    useEffect(() => {
        const handlePageChange = () => {
            if (cartItems.length && location.pathname !== "/catalog") {
                updateWithCartInfo(allMedications);
            }
        };
        handlePageChange();
    }, [location]);

    const updateWithCartInfo = (medications) => {
        const updateMedications = medications.map(med => {
            const isInCart = cartItems.some(item => item === med.id);
            if (isInCart) {
                return { ...med, status: "UNAVAILABLE" };
            } else {
                return { ...med };
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

    const append = (item) => {
        if (cartItems.length === 0) {
            setCartItems([item]);
        } else {
            const indexCart = cartItems.findIndex(value => value.id === item);
            if (indexCart < 0) {
                setCartItems(prevItems => [...prevItems, item]);
            }
        }
    }

    const remove = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
    }

    const value = {
        allMedications: allMedications,
        cartItems: cartItems,
        availability: availability,
        toggleAvailable: toggleAvailable,
        selectSort: selectSort,
        currentPage: currentPage,
        refPage: refPage.current,
        allPages: allPages,
        totalMed: totalMed,
        append: append,
        remove: remove,
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };
