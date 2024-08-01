import { React, useState, useContext, useEffect } from 'react';
import { Context } from "../Context";
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
    const context = useContext(Context);
    const cartIDs = context.cartItemsId.join();

    const [isSelectedAll, setIsSelectedAll] = useState(false);

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
                        .map(med => med.status === 'AVAILABLE' ?
                            ({ ...med, price: 29.99, isSelected: true }) :
                            ({ ...med, price: 29.99, isSelected: false }));
                    context.setCartMedications(filteredData);
                    context.setSelectedItems(filteredData.filter(med => med.status === 'AVAILABLE'));
                    setIsSelectedAll(filteredData
                        .filter(med => med.status === 'AVAILABLE').length > 0 ? true : false);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

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
        context.setSelectedItems(updateItems.filter(med => med.isSelected));
    }

    const handleDeleteSelected = () => {
        const onlySelected = context.cartMedications
            .filter(med => med.isSelected)
            .map(med => med.id);
        context.remove(onlySelected);
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

    return (
        <div className='shopping-cart'>
            <h1>Shopping cart {context.cartItemsId.length > 0 && `(${context.cartItemsId.length})`}</h1>
            {context.cartItemsId.length > 0 ? (
                <div className='cart-flex'>
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
                    <CartSummary btnType="shopping-cart" setIsSelectedAll={setIsSelectedAll} />
                </div>
            ) : (
                <div className='empty-cart'>Your cart is empty.</div>
            )}
        </div>
    )
}
