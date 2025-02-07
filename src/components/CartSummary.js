import { React, useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Context";
import Modal from "../modals/Modal";
import ModalError from "../modals/ModalError";

export default function CartSummary({ btnType, setIsSelectedAll }) {
    const context = useContext(Context);
    const [drones, setDrones] = useState([]);

    const [errorMessage, setErrorMessage] = useState();
    const [optional, setOptional] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    useEffect(() => {
        let ignore = false;

        const fetchAvailableDrones = async () => {
            if (btnType === 'checkout') return;

            try {
                const response = await fetch('/drone/available', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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
                    if (data.length === 0) {
                        setOptional('We will send you a notification when the drone becomes available.');
                        throw new Error('No drones available');
                    }
                    setDrones(data);
                }
            } catch (error) {
                if (!ignore) {
                    setErrorMessage('Error getting available drones: ' + error.message);
                }
            }
        };
        fetchAvailableDrones();

        return () => {
            ignore = true;
        }
    }, []);

    const selectedItems = localStorage.getItem('selected-items') ?
        JSON.parse(localStorage.getItem('selected-items')) : [];

    const totalSelected = selectedItems.length || 0;
    const totalWeight = selectedItems
        .reduce((accum, current) => accum + current.weight, 0) || 0;
    const totalPrice = selectedItems
        .reduce((accum, current) => accum + current.price, 0) || 0;

    const checkDronesWeight = (totalWeight) => {
        if (totalSelected === 0) {
            localStorage.setItem('drone', null);
            return;
        }
        const sortedDrones = [...drones].sort((a, b) => a.weightLimit - b.weightLimit);
        for (let drone of sortedDrones) {
            if (drone.weightLimit >= totalWeight) {
                localStorage.setItem('drone', JSON.stringify(drone.id));
                return drone.id;
            } else {
                localStorage.setItem('drone', null);
            }
        }
        return null;
    }

    const handleChooseBestCapacity = () => {
        const sortedItems = context.cartMedications
            .filter(med => med.status === 'AVAILABLE')
            .sort((a, b) => b.weight - a.weight);

        const calculateTotalWeight = (items) => {
            return items.reduce((accum, current) => accum + current.weight, 0);
        };

        const updateItemsSelection = (items) => {
            let totalWeight = calculateTotalWeight(items);
            while (totalWeight > 0 && checkDronesWeight(totalWeight) === null) {
                let bestItemToRemoveIndex = -1;
                let minDifference = Infinity;

                for (let i = 0; i < items.length; i++) {
                    const weightWithoutItem = totalWeight - items[i].weight;
                    const droneId = checkDronesWeight(weightWithoutItem);
                    if (droneId && (totalWeight - weightWithoutItem) < minDifference) {
                        localStorage.setItem('drone', JSON.stringify(droneId));
                        bestItemToRemoveIndex = i;
                        minDifference = totalWeight - weightWithoutItem;
                    }
                }

                if (bestItemToRemoveIndex === -1) {
                    bestItemToRemoveIndex = 0;
                }
                items[bestItemToRemoveIndex] = { ...items[bestItemToRemoveIndex], isSelected: false };
                items = items.filter((item, index) => index !== bestItemToRemoveIndex);
                totalWeight = calculateTotalWeight(items);
            }
            return items;
        }

        const updatedItems = updateItemsSelection([...sortedItems]);
        localStorage.setItem('selected-items', JSON.stringify(updatedItems));
        context.setSelectedItems(updatedItems);
        const newCartMedications = context.cartMedications.map(med => {
            const updatedItem = updatedItems.find(item => item.id === med.id);
            return updatedItem ? { ...med, isSelected: true } : { ...med, isSelected: false };
        })
        context.setCartMedications(newCartMedications);
    }

    return (
        <div className='summary'>
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
                    {btnType === "checkout" &&
                        <tr>
                            <td>Delivery</td>
                            <td>$5</td>
                        </tr>}
                    <tr>
                        <td>Subtotal</td>
                        <td>${btnType === "checkout" ? (totalPrice + 5).toFixed(2) : totalPrice.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            {(totalSelected === 0 && drones.length !== 0) &&
                <p className='summary-error null'>
                    * Please select something to proceed to checkout.
                </p>}

            {(checkDronesWeight(totalWeight) === null && drones.length !== 0) &&
                <div className='summary-error overweight'>
                    <p>* Unfortunately, we don't have a free drone available for the total weight of the selected items. In this case, we may offer you to arrange several deliveries.</p>
                    <p>Please choose the products yourself or click the button below and we will select the products according to the best capacity.</p>
                    <div>
                        <input type='checkbox' name='checkbox' id='checkbox'
                            defaultChecked={false}
                            onChange={() => {
                                handleChooseBestCapacity();
                                setIsSelectedAll(false);
                            }} />
                        <label htmlFor='checkbox'>Choose the best capacity</label>
                    </div>
                </div>}

            {(drones.length === 0 && btnType === "shopping-cart") &&
                <p className='summary-error null'>
                    * Unfortunately, we don't have a free drone available for the total weight of the selected items.
                </p>}

            {btnType === "shopping-cart" ? (
                <>
                    <div className='summary-btns'>
                        <Link to='/checkout' id='checkout'
                            className={(totalSelected === 0 ||
                                checkDronesWeight(totalWeight) === null) ?
                                "disabled" : undefined}
                            onClick={(e) => (totalSelected === 0 ||
                                checkDronesWeight(totalWeight) === null) &&
                                e.preventDefault()}>
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
                    <Link to="/orders" id='checkout'
                        onClick={(e) => !localStorage.getItem('drone') ?
                            e.preventDefault() :
                            context.setIsReadyPostFetch(true)}>
                        Checkout
                    </Link>
                </div>
            )}

            {errorMessage &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalError errorMessage={errorMessage} optional={optional} />
                </Modal>}
        </div>
    )
}
