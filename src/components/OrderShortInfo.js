import { React, useState, useEffect } from 'react';
import Modal from '../modals/Modal';
import ModalOrder from '../modals/ModalOrder';

export default function OrderShortInfo({ id }) {
    const [orderDetail, setOrderDetail] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        let ignore = false;
        fetch(`http://localhost:8090/delivery/${id}/full-info`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setOrderDetail(data);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

    const deliveryDate = (value) => {
        const today = new Date();
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return `${months[today.getMonth()]} ${today.getDate()}`;
    }

    return (
        <div className='order-short-info'>
            <div className='order-title'>
                <h3>Order on {orderDetail?.status !== 'DELIVERED' ?
                    deliveryDate() : 'March 17'}</h3>
                <div className={orderDetail.status === "DELIVERED" ? 'order-status delivered' : 'order-status'}>
                    {orderDetail.status}
                </div>
            </div>
            <p className='order-number'>#{orderDetail?.id?.slice(0, 8)}</p>
            <div className='order-info'>
                <div className='delivery-data'>
                    <h4>Delivery date</h4>
                    <p>{orderDetail?.status !== 'DELIVERED' ?
                        'Today, in 30 minutes' : 'March 17, 10:40'}</p>
                    <h4>total weight</h4>
                    <p>{orderDetail.capacity} G</p>
                    <h4>total price</h4>
                    <p>${((orderDetail?.items?.length) * 29.99 + 5).toFixed(2)}</p>
                </div>
                <div className='delivery-items'>
                    {orderDetail?.items?.map(item =>
                        <div key={item.id} className='medications'>
                            <img id='img' src={"http://localhost:8090" + item.imgUrl} alt={item.name} />
                        </div>
                    )}
                </div>
            </div>
            <div className='order-btns'>
                {orderDetail.status === "DELIVERED" && <button className='important'>Repeat the order</button>}
                <button className={orderDetail.status !== "DELIVERED" ? 'important' : null}
                    onClick={() => setModalIsOpen(true)}>
                    View details
                </button>
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <ModalOrder orderId={orderDetail.id} />
            </Modal>
        </div>
    )
}
