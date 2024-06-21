import { createContext, useState, useRef } from 'react';

const Context = createContext();

const ContextProvider = (props) => {
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

    const append = (item, quantity = 1) => {
        const itemIndex = cartItems.findIndex(value => value.id === item.id);
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: quantity
            };
            setCartItems([...cartItems, newItem]);
        }
    }

    const remove = (id) => {
        const newCart = cartItems.filter(item => item.id !== id);
        setCartItems(newCart);
    }

    const value = {
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
