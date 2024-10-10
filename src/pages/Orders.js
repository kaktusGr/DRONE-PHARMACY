import { React, useState, useContext, useEffect, useCallback } from 'react';
import { Context } from "../Context";
import OrderShortInfo from '../components/OrderShortInfo';
import PersonalInfo from '../components/PersonalInfo';
import Modal from '../modals/Modal';
import ModalOrder from '../modals/ModalOrder';

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

export default function Orders() {
    const context = useContext(Context);

    const [hasFetched, setHasFetched] = useState(false);
    const [allDeliveries, setAllDeliveries] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const getDeliveries = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:8090/delivery?sort=status,desc", {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAllDeliveries(data.content);
        } catch (error) {
            console.error('Error getting order history: ', error);
        }
    }, []);

    const postAndGetDeliveries = useCallback(
        debounce(async (order) => {
        try {
            if (context.droneId && context.isReadyPostFetch && !hasFetched) {
                const response = await fetch('http://localhost:8090/delivery/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(order)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCurrentOrderId(data.id);
                context.remove(order.medicationItems);
                context.setIsReadyPostFetch(false);
                setHasFetched(true);

                await getDeliveries();
            } else if (!hasFetched) {
                await getDeliveries();
                setHasFetched(true);
            }
        } catch (error) {
            console.error('Error order creation: ', error);
        }
    }, 500), [context, hasFetched, getDeliveries]);

    useEffect(() => {
        const order = {
                "droneId": context.droneId,
                "medicationItems": context.selectedItems.map(item => item.id),
            };
        if (!hasFetched) {
            postAndGetDeliveries(order);
        }
    });

    const allOrders = allDeliveries.map(delivery =>
        <OrderShortInfo key={delivery.id} {...delivery} />);

    return (
        <div className='orders'>
            <PersonalInfo />
            <div className='orders-info'>
                <h1>Orders ({allDeliveries.length})</h1>
                <div className='all-orders'>
                    {allOrders}
                </div>
            </div>
            {currentOrderId &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalOrder orderId={currentOrderId} />
                </Modal>
            }
        </div>
    )
}
