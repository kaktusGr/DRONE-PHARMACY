import { React, useContext } from 'react';
import { Context } from "../Context";
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

export default function ShoppingCart() {
    const context = useContext(Context);

    const showMedicationsInCart = () => {
        const medications = context.allMedicines.map(med => {
            const isInCart = context.cartItems.some(item => item === med.id);
            if (isInCart) {
                return <CartItem key={med.id} {...med} />
            }
        });
        return medications;
    }

    return (
        <div className='shopping-cart'>
            <h1>Shopping cart {context.cartItems.length > 0 && `(${context.cartItems.length})`}</h1>
            {context.cartItems.length ? (
                <div className='cart-flex'>
                    <div>
                        <div className='selected-btn'>
                            <div className='checkbox'>
                                <input type='checkbox' name='checkbox' />
                                <label>Select all items</label>
                            </div>
                            <button className='delete'>
                                <img src="./images/icons/trash.svg" alt="cart" />
                                Delete selected items
                            </button>
                        </div>
                        <div className='cart-items'>
                            <h3>Available for delivery</h3>
                            <ul>
                                {showMedicationsInCart()}
                            </ul>
                        </div>
                    </div>
                    <CartSummary />
                </div>
            ) : (
                <div className='empty-cart'>Your cart is empty.</div>
            )}
        </div>
    )
}
