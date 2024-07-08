import { React, useState, useContext, useEffect } from 'react';
import { Context } from "../Context";
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function ShoppingCart() {
    const context = useContext(Context);
    const cartIDs = context.cartItems.join();

    const [isSelectedAll, setIsSelectedAll] = useState(true);

    useEffect(() => {
        let ignore = false;
        fetch(`http://localhost:8090/medication?size=20&ids=${cartIDs}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    const filteredData = data.content
                        .filter(med => context.cartItems.includes(med.id))
                        .map(med => ({ ...med, price: 29.99, isSelected: true }));
                    context.setCartMedications(filteredData);
                    context.setSelectedItems(filteredData);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

    const handleSelectItem = (id) => {
        const updateItems = context.cartMedications
            .map(med => med.id === id ? { ...med, isSelected: !med.isSelected } : med);
        context.setCartMedications(updateItems);
        setIsSelectedAll(updateItems.every(item => item.isSelected));
        context.setSelectedItems(updateItems.filter(med => med.isSelected));
    }

    const handleSelectAll = () => {
        const newSelectAll = !isSelectedAll;
        setIsSelectedAll(newSelectAll);
        const updateItems = context.cartMedications
            .map(med => ({ ...med, isSelected: newSelectAll }));
        context.setCartMedications(updateItems);
        context.setSelectedItems(updateItems.filter(med => med.isSelected));
    }

    const handleDeleteSelected = () => {
        const onlySelected = context.cartMedications
            .filter(med => med.isSelected)
            .map(med => med.id);
        context.remove(onlySelected);
        context.setSelectedItems(null);
    }

    const medicationsInCart = context.cartMedications
        .map(med => <CartItem key={med.id} {...med}
            handleSelectItem={handleSelectItem} />);

    return (
        <div className='shopping-cart'>
            <h1>Shopping cart {context.cartItems.length > 0 && `(${context.cartItems.length})`}</h1>
            {context.cartItems.length ? (
                <div className='cart-flex'>
                    <div>
                        <div className='selected-btn'>
                            <div className='checkbox'>
                                <input type='checkbox' name='checkbox'
                                    checked={isSelectedAll}
                                    onChange={handleSelectAll} />
                                <label htmlFor="checkbox">Select all items</label>
                            </div>
                            <button className='delete' onClick={handleDeleteSelected}>
                                <img src="./images/icons/trash.svg" alt="trash" />
                                Delete selected items
                            </button>
                        </div>
                        <div className='cart-items'>
                            <h3>Available for delivery</h3>
                            <ul>
                                {medicationsInCart}
                            </ul>
                        </div>
                    </div>
                    <CartSummary btnType="shopping-cart" />
                </div>
            ) : (
                <div className='empty-cart'>Your cart is empty.</div>
            )}
        </div>
    )
}
