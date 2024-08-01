import { createContext, useState } from 'react';

const Context = createContext();

const ContextProvider = (props) => {
    const [cartMedications, setCartMedications] = useState([]);
    const [cartItemsId, setCartItemsId] = useState(localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : []);
    const [selectedItems, setSelectedItems] = useState([]);

    const [droneId, setDroneId] = useState();
    const [deliveryDetail, setDeliveryDetail] = useState();
    const [isReadyPostFetch, setIsReadyPostFetch] = useState(false);

    const append = (id) => {
        if (cartItemsId.length === 0) {
            setCartItemsId([id]);
            localStorage.setItem('cart', JSON.stringify([id]));
        } else {
            const indexCart = cartItemsId.findIndex(value => value === id);
            if (indexCart < 0) {
                setCartItemsId(prevIDs => [...prevIDs, id]);
                localStorage.setItem('cart', JSON.stringify(([...cartItemsId, id])));
            }
        }
    }

    const remove = (ids) => {
        const idsArray = Array.isArray(ids) ? ids : [ids];
        const newCart = cartItemsId.filter(item => !idsArray.includes(item));
        setCartItemsId(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        const filteredData = cartMedications.filter(med => newCart.includes(med.id));
        setCartMedications(filteredData);
        setSelectedItems(filteredData.filter(med => med.isSelected));
    }

    const value = {
        cartMedications,
        setCartMedications,
        cartItemsId,
        setCartItemsId,
        selectedItems,
        setSelectedItems,
        append,
        remove,
        droneId,
        setDroneId,
        deliveryDetail,
        setDeliveryDetail,
        isReadyPostFetch,
        setIsReadyPostFetch,
    }

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };
