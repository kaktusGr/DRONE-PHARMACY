import { React } from 'react';
import { Link } from "react-router-dom";

export default function CartSummary({ totalSelected, totalWeight, totalPrice }) {
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
        </div>
    )
}
