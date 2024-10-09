import { React, useState, useContext, useEffect, useCallback } from 'react';
import { Context } from "../Context";
import OrderShortInfo from '../components/OrderShortInfo';
import PersonalInfo from '../components/PersonalInfo';

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
                    setAllDeliveriesId(prevId => [data.id, ...prevId]);
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
    }, [context.isReadyPostFetch, hasFetched]);

    const [allDeliveriesId, setAllDeliveriesId] = useState([
        'cee1232a-eb3a-4019-9744-f84599577afa',
        'ed0050ca-6bf9-4374-b493-0396798732b6',
        '64c92691-fc79-4f8a-971a-7aaa3c09c1c9',
        '897dce16-26f5-4af3-87ca-7fa36b52391b',
        'b6810de9-e376-43e0-83c3-e6379bdc3359',
    ]);

    const allOrders = allDeliveriesId.map(item =>
        <OrderShortInfo key={item} id={item} />);

    return (
        <div className='orders'>
            <PersonalInfo />
            <div className='orders-info'>
                <h1>Orders ({allDeliveriesId.length})</h1>
                <div className='all-orders'>
                    {allOrders}
                </div>
            </div>
        </div>
    )
}
