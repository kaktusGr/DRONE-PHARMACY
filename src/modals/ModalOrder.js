import { React, useState, useEffect } from 'react';

export default function ModalOrder({ orderId }) {
    const [currentOrder, setCurrentOrder] = useState();

    useEffect(() => {
        let ignore = false;
        let checkStatus = '';
        const fetchRequest = () => {
            fetch(`http://localhost:8090/delivery/${orderId}/full-info`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(result => result.json())
                .then(data => {
                    if (!ignore) {
                        setCurrentOrder(data);
                        checkStatus = data.status;
                    }
                });
        }
        fetchRequest();
        const interval = setInterval(() => {
            if (checkStatus !== "DELIVERED") {
                fetchRequest();
            }
        }, 10000);
        return () => {
            ignore = true;
            clearInterval(interval);
        }
    }, [orderId]);

    const deliveryNumber = currentOrder?.id?.slice(0, 8);
    const deliveryQtyItems = currentOrder?.items?.length;
    const deliveryStatus = {
        'LOADING': 0,
        'LOADED': 229,
        'DELIVERING': 466,
        'DELIVERED': 716
    };

    const dronePosition = () => {
        for (let [key, value] of Object.entries(deliveryStatus)) {
            if (currentOrder?.status === key) {
                return value;
            }
        }
    }

    return (
        <>
            <h2>Order #{deliveryNumber}</h2>
            <div className='modal-order-status'>
                <ul>
                    {Object.keys(deliveryStatus).map((key, idx) =>
                        <li key={idx} className={currentOrder?.status === key ?
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
                            {currentOrder?.status === 'DELIVERED' ?
                                <td>March 17, 10:40</td> :
                                <td>Today, in 30 minutes</td>}
                            <td>12 Default St, City, Country</td>
                            <td>Full Name</td>
                            <td rowSpan='3'>
                                {currentOrder?.items?.map(item => (
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
                            <td>{currentOrder?.capacity || 0} G</td>
                            <td>
                                ${deliveryQtyItems ? (deliveryQtyItems * 29.99 + 5).toFixed(2) : 0}
                            </td>
                            <td>Cash</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
