import { React, useContext } from 'react';
import { Context } from "../Context";

export default function CartSummary({ totalWeight, totalPrice }) {
    const context = useContext(Context);

    return (
        <div className='cart-summary'>
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'><h3>Summary</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Selected Items</td>
                        <td>{context.cartItems.length}</td>
                    </tr>
                    <tr>
                        <td>Total Weight</td>
                        <td>{totalWeight} G</td>
                    </tr>
                    <tr>
                        <td>Subtotal</td>
                        <td>${totalPrice}</td>
                    </tr>
                </tbody>
            </table>
            <div className='summary-btns'>
                <button id='checkout'>Proceed to checkout</button>
                <button id='catalog'>Continue shopping</button>
            </div>
            <p>The available delivery methods and time can be selected at checkout.</p>
        </div>
    )
}
