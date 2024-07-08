import { React, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Context";

export default function CartSummary({ btnType }) {
    const context = useContext(Context);

    const totalSelected = context.selectedItems ? (
        context.selectedItems.length
    ) : 0;

    const totalWeight = context.selectedItems ? (
        context.selectedItems
            .map(med => med.weight)
            .reduce((accum, current) => accum + current, 0)
    ) : 0;

    const totalPrice = context.selectedItems ? (
        context.selectedItems
            .map(med => med.price)
            .reduce((accum, current) => accum + current, 0)
    ) : 0;

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
                        <td>{totalSelected}</td>
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
            {totalSelected === 0 && <p className='summary-error'>
                * Please select something to proceed to checkout
            </p>}
            {btnType === "shopping-cart" ? (
                <>
                    <div className='summary-btns'>
                        <Link to='/checkout' id='checkout' className={totalSelected === 0 ? "disabled" : undefined}
                            onClick={(e) => totalSelected === 0 && e.preventDefault()}>
                            Proceed to checkout
                        </Link>
                        <Link to='/catalog' id='catalog'>
                            Continue shopping
                        </Link>
                    </div>
                    <p>The available delivery methods and time can be selected at checkout.</p>
                </>
            ) : (
                <div className='summary-btns'>
                    <button id='checkout'>
                        Checkout
                    </button>
                </div>
            )}
        </div>
    )
}
