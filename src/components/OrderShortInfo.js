import { React, useState } from 'react';
import Modal from '../modals/Modal';
import ModalOrder from '../modals/ModalOrder';

export default function OrderShortInfo(props) {
    const { id, capacity, status, items } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const deliveryDate = () => {
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
                <h3>Order on {status === 'DELIVERED' ? 'March 17' : deliveryDate()}</h3>
                <div className={status === "DELIVERED" ? 'order-status delivered' : 'order-status'}>
                    {status}
                </div>
            </div>
            <p className='order-number'>#{id.slice(0, 8)}</p>
            <div className='order-info'>
                <div className='delivery-data'>
                    <h4>Delivery date</h4>
                    <p>{status === 'DELIVERED' ? 'March 17, 10:40' : 'Today, in 30 minutes'}</p>
                    <h4>total weight</h4>
                    <p>{capacity} G</p>
                    <h4>total price</h4>
                    <p>${((items.length) * 29.99 + 5).toFixed(2)}</p>
                </div>
                <div className='delivery-items'>
                    {items.map(item =>
                        <div key={item.id} className='medications'>
                            <img id='img' src={item.imgUrl} alt={item.name} />
                        </div>
                    )}
                </div>
            </div>
            <div className='order-btns'>
                <button className='important' onClick={() => setModalIsOpen(true)}>
                    View details
                </button>
                {status === "DELIVERED" && <button>Repeat the order</button>}
            </div>
            <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <ModalOrder orderId={id} />
            </Modal>
        </div>
    )
}
