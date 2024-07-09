import { React, useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Context";

export default function CartSummary({ btnType, handleSelectItem }) {
    const context = useContext(Context);

    const [drones, setDrones] = useState([]);
    const [isBestCapacity, setIsBestCapacity] = useState(false);

    useEffect(() => {
        let ignore = false;
        fetch('http://localhost:8090/drone/available', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setDrones(data);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

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

    const checkDronesWeight = () => {
        const sortDroneWeight = drones
            .sort((a, b) => a.weightLimit - b.weightLimit)
        for (let drone of sortDroneWeight) {
            if (drone.weightLimit >= totalWeight) {
                return drone.id;
            }
        }
        return null;
    }

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
            {totalSelected === 0 && <p className='summary-error null'>
                * Please select something to proceed to checkout
            </p>}
            {checkDronesWeight() === null &&
                <div className='summary-error overweight'>
                    <p>* Unfortunately, we don't have a free drone available for the total weight of the selected items. In this case, we may offer you to arrange several deliveries.</p>
                    <p>Please choose the products yourself or click the button below and we will select the products according to the best capacity.</p>
                    <div>
                        <input type='checkbox' name='checkbox' id='checkbox'
                            checked={isBestCapacity}
                            onChange={(e) => {
                                setIsBestCapacity(e.target.checked);
                            }} />
                        <label htmlFor='checkbox'>Choose the best capacity</label>
                    </div>
                </div>}
            {btnType === "shopping-cart" ? (
                <>
                    <div className='summary-btns'>
                        <Link to='/checkout' id='checkout'
                            className={(totalSelected === 0 || checkDronesWeight() === null) ? "disabled" : undefined}
                            onClick={(e) => (totalSelected === 0 || checkDronesWeight() === null)
                                && e.preventDefault()}>
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
