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

    const order = {
        "droneId": context.droneId,
        "medicationItems": context.selectedItems.map(item => item.id),
    };

    const [hasFetched, setHasFetched] = useState(false);
    const [allDeliveries, setAllDeliveries] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const postRequest = useCallback(
        debounce(async (order) => {
            try {
                if (context.droneId) {
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
                    setHasFetched(true);
                    context.setIsReadyPostFetch(false);
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }, 500),
        [context]
    );

    useEffect(() => {
        if (!context.isReadyPostFetch || hasFetched) return;
        postRequest(order);
    }, [context.isReadyPostFetch, hasFetched, order]);

    useEffect(() => {
        let ignore = false;
        fetch("http://localhost:8090/delivery", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    // setAllPages(data.totalPages);
                    setAllDeliveries(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, [currentOrderId]);

    const allOrders = allDeliveries.map(item =>
        <OrderShortInfo key={item.id} id={item.id} />);

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
