import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CheckoutDelivery from '../components/CheckoutDelivery';
import CartSummary from '../components/CartSummary';
import DroneDetail from '../components/DroneDetail';
import PlaceholderCheckout from '../placeholders/PlaceholderCheckout';
import Modal from "../modals/Modal";
import ModalError from "../modals/ModalError";

export default function Checkout() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const selectedItems = JSON.parse(localStorage.getItem('selected-items'));

    const [errorMessage, setErrorMessage] = useState();
    const [optional, setOptional] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const navigate = useNavigate();
    const MAX_ATTEMPTS = 5;
    const INTERVAL = 2000;
    const TIMEOUT = 10000;

    useEffect(() => {
        let attempts = 0;
        let intervalId, timeoutId;

        const fetchRequest = async () => {
            try {
                const response = await fetch('/drone/available', {
                    method: 'HEAD',
                    mode: 'no-cors',
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
                            setOptional("Please wait for the server's response.");
                            throw new Error('Internal server error');
                        case 503:
                            throw new Error('Service unavailable');
                        default:
                            throw new Error(`Unexpected error: ${response.status}`);
                    }
                }

                clearInterval(intervalId);
                clearTimeout(timeoutId);
                setErrorMessage(null);
                setOptional(null);
            } catch (error) {
                if (error.message.includes('Failed to fetch')) {
                    setErrorMessage('Network error');
                    setOptional('Check your Internet connection and the requested URL.');
                } else {
                    setErrorMessage(error.message);
                }

                attempts += 1;
                if (attempts >= MAX_ATTEMPTS) {
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    navigate('/error');
                }
            }
        };

        intervalId = setInterval(fetchRequest, INTERVAL);
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            navigate('/error');
        }, TIMEOUT);

        fetchRequest();

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            setErrorMessage(null);
            setOptional(null);
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='checkout'>
            <h1>Checkout</h1>
            {(!errorMessage || isLoading) ?
                isLoading ? <PlaceholderCheckout /> :
                    <div className='checkout-main'>
                        <div className='checkout-details'>
                            <Link to="/shopping-cart">
                                <img src="./images/icons/chevron-up.svg" alt="arrow-up" />Back to Cart
                            </Link>
                            <div className='checkout-customer'>
                                <h3>customer info</h3>
                                <form name="form-customer" action="" method="get">
                                    <input type='text' placeholder='First name*' disabled></input>
                                    <input type='text' placeholder='Last name*' disabled></input>
                                    <input type='phone' placeholder='Phone number*' disabled></input>
                                    <input type='email' placeholder='Email' disabled></input>
                                </form>
                            </div>
                            <CheckoutDelivery />
                            <div className='checkout-payment'>
                                <h3>payment</h3>
                                <div className='attention'>
                                    <img src="./images/icons/info-circle.svg" alt="attention" />
                                    <p>Currently, we accept cash only. Please write in the comments to the order whether you need change and how much.</p>
                                </div>
                            </div>
                        </div>

                        <div className='checkout-summary'>
                            <div className='checkout-selected-med'>
                                <h3>Selected medications</h3>
                                {selectedItems.length > 0 &&
                                    <div>
                                        {selectedItems
                                            .map(item =>
                                                <div key={item.id} className='medications'>
                                                    <img id='img' src={item.imgUrl} alt={item.name} />
                                                    <small>{item.name}</small>
                                                </div>
                                            )}
                                    </div>}
                            </div>
                            <DroneDetail />
                            <CartSummary btnType="checkout" />
                            <div className='promo-code'>
                                <div onClick={() => setIsOpen(!isOpen)}>
                                    <h3><img src="./images/icons/percentage-circle.svg" alt='percentage' /> Promo code</h3>
                                    <img src="./images/icons/chevron-down.svg" alt='arrow-down' />
                                </div>
                                {isOpen && (
                                    <form name="form-promo-code" action="" method="get">
                                        <input type='text' placeholder='Promo-code' disabled></input>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div> :
                <div className='loader-spinner' />
            }

            {errorMessage &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalError errorMessage={errorMessage} optional={optional} />
                </Modal>}
        </div>
    )
}
