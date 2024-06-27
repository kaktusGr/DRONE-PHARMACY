import { createContext, useState, useRef, useEffect } from 'react';

const Context = createContext();

const ContextProvider = (props) => {
    const [allMedicines, setAllMedicines] = useState([]);
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
                    // setAllMedicines(data.content);

                    if (cartItems.length) {
                        for (let med of cartItems) {
                            const indexMed = allMedicines.findIndex(value => value.id === med.id);
                            const newItem = {
                                ...med,
                                status: "UNAVAILABLE"
                            };
                            const newAllMed = data.content.slice();
                            newAllMed.splice(indexMed, 1, newItem);
                            setAllMedicines(newAllMed);
                            console.log("step");
                        }
                    } else {
                        setAllMedicines(data.content);
                    }
                    // for (let med of data.content) {
                    //     const indexMed = data.content.findIndex(value => value.id === med.id);
                    //     if (cartItems.length) {
                    //         for (let item of cartItems) {
                    //             if (item.id === med.id) {
                    //                 const newItem = {
                    //                     ...med,
                    //                     status: "UNAVAILABLE"
                    //                 };
                    //                 const newAllMed = data.content.slice();
                    //                 newAllMed.splice(indexMed, 1, newItem);
                    //                 setAllMedicines(newAllMed);
                    //             }
                    //         }
                    //     } else {
                    //         setAllMedicines(data.content);
                    //     }
                    // }

                    // updateCatalog();
                    console.log("fetch");
                }
            });
        return () => {
            ignore = true;
        }
    }, [urlMedication]);

    const toggleAvailable = (value) => {
        refPage.current = 0;
        setAvailability(value);
        setUrlMedication(value
            ? href + refPage.current + "&" + urlFilters.available + "&" + urlSelect
            : href + refPage.current + "&" + urlSelect);
        updateCatalog();
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
        updateCatalog();
    }

    const updateCatalog = () => {
        console.log("update");
        // for (let med of allMedicines) {
        //     const indexMed = allMedicines.findIndex(value => value.id === med.id);
        //     if (cartItems.length) {
        //         for (let item of cartItems) {
        //             if (item.id === med.id) {
        //                 const newItem = {
        //                     ...med,
        //                     status: "UNAVAILABLE"
        //                 };
        //                 const newAllMed = allMedicines.slice();
        //                 newAllMed.splice(indexMed, 1, newItem);
        //                 setAllMedicines(newAllMed);
        //             }
        //         }
        //     } else {
        //         setAllMedicines(allMedicines);
        //     }
        // }
    }

    const append = (item, quantity = 1) => {
        const indexCart = cartItems.findIndex(value => value.id === item.id);
        if (indexCart < 0) {
            const newItem = {
                ...item,
                quantity: quantity
            };
            setCartItems([...cartItems, newItem]);
        }
        updateCatalog();
    }

    const remove = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
    }

    // const medLS = JSON.parse(localStorage.getItem('medicine'));
    // if (medLS) {
    //     medLS.forEach(med => setAllMedicines(med));
    // }
    // const updateLS = () => {
    //     const medLS = [];
    //     allMedicines.forEach(med => medLS.push(med));
    //     localStorage.setItem('medicine', JSON.stringify(medLS));
    // }
    // updateLS();

    const value = {
        allMedicines: allMedicines,
        setAllMedicines: setAllMedicines,
        // refAllMedicines: refAllMedicines,
        cartItems: cartItems,
        urlMedication: urlMedication,
        availability: availability,
        toggleAvailable: toggleAvailable,
        selectSort: selectSort,
        currentPage: currentPage,
        refPage: refPage.current,
        allPages: allPages,
        setAllPages: setAllPages,
        totalMed: totalMed,
        setTotalMed: setTotalMed,
        updateCatalog: updateCatalog,
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
