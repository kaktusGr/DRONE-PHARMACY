import { React, useState, useContext, useEffect, useCallback } from 'react';
import { Context } from "../Context";
import Modal from '../components/Modal';

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

export default function Orders() {
    const context = useContext(Context);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
                    context.setDeliveryDetail(data);
                    context.remove(order.medicationItems);
                    setHasFetched(true);
                    context.setIsReadyPostFetch(false);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }, 500),
        [context]
    );

    useEffect(() => {
        if (!context.isReadyPostFetch || hasFetched) return;
        postRequest(order);
    }, [context.isReadyPostFetch, context.droneId, hasFetched, postRequest]);


    const deliveryNumber = context.deliveryDetail?.id?.slice(0, 8);
    const deliveryQtyItems = context.deliveryDetail?.items?.length;
    const deliveryStatus = {
        'LOADING': 0,
        'LOADED': 229,
        'DELIVERING': 466,
        'DELIVERED': 716
    };

    const dronePosition = () => {
        for (let [key, value] of Object.entries(deliveryStatus)) {
            if (context.deliveryDetail?.status === key) {
                return value;
            }
        }
    }

    return (
        <div className='orders'>
            <h1>Orders</h1>
            {context.deliveryDetail && (
                <>
                    <button onClick={() => setModalIsOpen(true)}
                        style={{
                            backgroundColor: "white",
                            padding: "28px",
                            fontSize: "20px",
                            textTransform: "uppercase",
                            border: "none",
                            borderRadius: "24px",
                            cursor: "pointer",
                        }}>
                        Order #{deliveryNumber}
                    </button>
                    <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                        <h2>Order #{deliveryNumber}</h2>
                        <div className='modal-order-status'>
                            <ul>
                                {Object.keys(deliveryStatus).map((key, idx) =>
                                    <li key={idx} className={context.deliveryDetail?.status === key ?
                                        'drone-current-status' : null}>{key}</li>
                                )}
                            </ul>
                            <hr />
                            <img src='./images/icons/drone.svg' alt='drone' style={{
                                transform: `translateX(${dronePosition()}px)`
                            }} />
                        </div>
                        <div className='modal-map'>
                            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5745812.178461732!2d22.0656967!3d45.3170636!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srs!4v1720444257584!5m2!1sen!2srs" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className='modal-order-details'>
                            <table>
                                <thead>
                                    <tr>
                                        <th colSpan='4'><h3>Package Details</h3></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><h4>Delivery time</h4></td>
                                        <td><h4>Address</h4></td>
                                        <td><h4>Recipient</h4></td>
                                        <td><h4>Medications</h4></td>
                                    </tr>
                                    <tr>
                                        <td>Today, 13:20</td>
                                        <td>Belgrade</td>
                                        <td>Anna Smith</td>
                                        <td rowSpan='3'>
                                            {context.deliveryDetail?.items?.map(item => (
                                                <li key={item.id}>{item.name}</li>
                                            )) || <p>Loading...</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><h4>total weight</h4></td>
                                        <td><h4>total price</h4></td>
                                        <td><h4>payment</h4></td>
                                    </tr>
                                    <tr>
                                        <td>{context.deliveryDetail?.capacity || 0} G</td>
                                        <td>
                                            ${deliveryQtyItems ? (deliveryQtyItems * 29.99 + 5).toFixed(2) : 0}
                                        </td>
                                        <td>Cash</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    )
}
