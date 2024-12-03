import { React, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import PlaceholderCartSummary from '../placeholders/PlaceholderCartSummary';
import PlaceholderShoppingCart from '../placeholders/PlaceholderShoppingCart';
import { Link } from 'react-router-dom';
import Modal from "../modals/Modal";
import ModalError from "../modals/ModalError";

export default function ShoppingCart() {
    const context = useContext(Context);
    const cartIDs = context.cartItemsId.join();
    const [isSelectedAll, setIsSelectedAll] = useState(false);

    const [errorMessage, setErrorMessage] = useState();
    const [optional, setOptional] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const navigate = useNavigate();
    const MAX_ATTEMPTS = 5;
    const INTERVAL = 2000;
    const TIMEOUT = 10000;

    useEffect(() => {
        if (!cartIDs) return;

        let ignore = false;
        let attempts = 0;
        let intervalId, timeoutId;

        const fetchMedication = async () => {
            try {
                const response = await fetch(`http://localhost:8090/medication?size=20&ids=${cartIDs}&sort=name,asc`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    switch (response.status) {
                        case 400:
                            throw new Error('Bad request sent');
                        case 404:
                            throw new Error('Resource not found for the given request');
                        case 429:
                            throw new Error('Too many requests');
                        case 500:
                            throw new Error('Internal server error');
                        case 503:
                            throw new Error('Service unavailable');
                        default:
                            throw new Error(`Unexpected error: ${response.status}`);
                    }
                }

                const data = await response.json();

                if (!ignore) {
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    setErrorMessage(null);
                    setOptional(null);

                    const selectedItemsId = localStorage.getItem('selected-items') &&
                        localStorage.getItem('selected-items').length > 0 ?
                        JSON.parse(localStorage.getItem('selected-items')).map(item => item.id) : null;

                    const filteredData = data.content
                        .map(med => ({ ...med, price: 29.99 }))
                        .map(med => {
                            if (selectedItemsId.length === 0) {
                                return med.status === 'AVAILABLE' ?
                                    ({ ...med, isSelected: true }) :
                                    ({ ...med, isSelected: false });
                            } else {
                                const findSelectedItems = selectedItemsId
                                    .find(item => item === med.id);
                                if (findSelectedItems && med.status === 'AVAILABLE') {
                                    return { ...med, isSelected: true };
                                } else {
                                    return { ...med, isSelected: false };
                                }
                            }
                        });
                    context.setCartMedications(filteredData);

                    const checkAvailableItems = filteredData
                        .filter(med => med.status === 'AVAILABLE' && med.isSelected);
                    localStorage.setItem('selected-items', JSON.stringify(checkAvailableItems));
                    context.setSelectedItems(checkAvailableItems);

                    setIsSelectedAll(filteredData
                        .filter(med => med.status === 'AVAILABLE').length === selectedItemsId.length ||
                        selectedItemsId.length === 0 ? true : false);
                }
            } catch (error) {
                if (!ignore) {
                    if (error.message.includes('Failed to fetch')) {
                        setErrorMessage('Network error');
                        setOptional('Check your Internet connection and the requested URL.');
                    } else {
                        setErrorMessage('Error getting medications: ' + error.message);
                    }

                    attempts += 1;
                    if (attempts >= MAX_ATTEMPTS) {
                        clearInterval(intervalId);
                        clearTimeout(timeoutId);
                        navigate('/');
                    }
                }
            }
        }

        intervalId = setInterval(fetchMedication, INTERVAL);
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            navigate('/');
        }, TIMEOUT);

        fetchMedication();

        return () => {
            ignore = true;
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            setErrorMessage(null);
            setOptional(null);
        }
    }, [cartIDs]);

    const handleSelectItem = (id) => {
        const updateItems = context.cartMedications
            .map(med => med.id === id ? (
                med.status === 'AVAILABLE' ?
                    { ...med, isSelected: !med.isSelected } :
                    { ...med, isSelected: false }) : med);
        context.setCartMedications(updateItems);
        setIsSelectedAll(updateItems
            .filter(item => item.status === 'AVAILABLE')
            .every(item => item.isSelected));
        localStorage.setItem('selected-items', JSON.stringify(updateItems
            .filter(med => med.isSelected)));
        context.setSelectedItems(updateItems
            .filter(med => med.isSelected));
    }

    const handleSelectAll = () => {
        const newSelectAll = !isSelectedAll;
        setIsSelectedAll(newSelectAll);
        const updateItems = context.cartMedications
            .map(med => med.status === 'AVAILABLE' ?
                ({ ...med, isSelected: newSelectAll }) :
                ({ ...med, isSelected: false }));
        context.setCartMedications(updateItems);
        localStorage.setItem('selected-items', JSON.stringify(updateItems.filter(med => med.isSelected)));
        context.setSelectedItems(updateItems.filter(med => med.isSelected));
    }

    const handleDeleteSelected = () => {
        const onlySelected = context.cartMedications
            .filter(med => med.isSelected)
            .map(med => med.id);
        context.remove(onlySelected);
        localStorage.setItem('selected-items', JSON.stringify([]));
        context.setSelectedItems([]);
        setIsSelectedAll(false);
    }

    const medicationsInCartA = context.cartMedications
        .filter(med => med.status === 'AVAILABLE')
        .map(med => {
            return <CartItem key={med.id} {...med}
                handleSelectItem={handleSelectItem} />
        });

    const medicationsInCartUn = context.cartMedications
        .filter(med => med.status === 'UNAVAILABLE')
        .map(med => {
            return <CartItem key={med.id} {...med}
                handleSelectItem={handleSelectItem} />
        });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='shopping-cart'>
            <h1>Shopping cart {(context.cartItemsId.length > 0 && !isLoading && !errorMessage)
                && `(${context.cartItemsId.length})`}</h1>
            {context.cartItemsId.length > 0 ? (
                (!errorMessage || isLoading) ?
                    <div className='cart-flex'>
                        {isLoading ? <PlaceholderShoppingCart /> :
                            <div>
                                <div className='selected-btn'>
                                    <div className='checkbox'>
                                        <input type='checkbox' name='checkbox' id='checkbox'
                                            checked={isSelectedAll}
                                            onChange={handleSelectAll} />
                                        <label htmlFor="checkbox">Select all items</label>
                                    </div>
                                    <button className='delete' onClick={handleDeleteSelected}>
                                        <img src="./images/icons/trash.svg" alt="trash" />
                                        Delete selected items
                                    </button>
                                </div>
                                <div className='cart-items available'>
                                    <h3>Available for delivery</h3>
                                    <ul>
                                        {medicationsInCartA}
                                    </ul>
                                </div>
                                {medicationsInCartUn.length > 0 &&
                                    <div className='cart-items unavailable'>
                                        <h3>Unavailable for delivery</h3>
                                        <ul>
                                            {medicationsInCartUn}
                                        </ul>
                                        <div className='attention'>
                                            <img src="./images/icons/info-circle.svg" alt="attention" />
                                            <p>Unfortunately, this item is not available, but we can offer you similar products.<br />
                                                <Link to="/catalog">See products</Link></p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {isLoading ? <PlaceholderCartSummary btnType="shopping-cart" /> :
                            <CartSummary btnType="shopping-cart" setIsSelectedAll={setIsSelectedAll} />}
                    </div> :
                    <div className='loader-spinner' />
            ) : (
                <div className='empty-cart'>Your cart is empty.</div>
            )}

            {errorMessage &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalError errorMessage={errorMessage} optional={optional} />
                </Modal>}
        </div>
    )
}
