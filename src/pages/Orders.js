import { React, useState, useContext, useEffect } from 'react';
import { Context } from "../Context";
import Modal from '../components/Modal';

export default function Orders() {
    const context = useContext(Context);

    const order = {
        "droneId": context.droneId,
        "medicationItems": context.selectedItems.map(item => item.id),
    };

    const [deliveryDetail, setDeliveryDetail] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        let ignore = false;
        if (context.droneId) {
            fetch(`http://localhost:8090/delivery/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            })
                .then(result => result.json())
                .then(data => {
                    if (!ignore) {
                        console.log(data);
                        setDeliveryDetail(data);
                        context.remove(order.medicationItems);
                    }
                });
        }
        return () => {
            ignore = true;
        }
    }, []);

    const deliveryNumber = deliveryDetail?.id?.slice(0, 8);
    const deliveryQtyItems = deliveryDetail?.items?.length;
    const deliveryStatus = ['LOADING', 'LOADED', 'DELIVERING', 'DELIVERED'];

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='orders'>
            <h1>Orders</h1>
            {deliveryDetail && (
                <>
                    <button onClick={openModal}
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
                    <Modal isOpen={modalIsOpen} onClose={closeModal}>
                        <h2>Order #{deliveryNumber}</h2>
                        <div className='modal-order-status'>
                            <ul>
                                {deliveryStatus.map((status, idx) => {
                                    if (deliveryDetail?.status === status) {
                                        return <li id={idx} style={{
                                            fontWeight: "600",
                                            color: "#383838"
                                        }}>{status}</li>
                                    } else {
                                        return <li id={idx}>{status}</li>
                                    }
                                })}
                            </ul>
                            <hr />
                            <img src='./images/icons/drone.svg' alt='drone' />
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
                                            {deliveryDetail?.items?.map(item => (
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
                                        <td>{deliveryDetail?.capacity || 0} G</td>
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
