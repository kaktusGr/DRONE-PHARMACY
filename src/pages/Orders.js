import { React, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { Context } from "../Context";
import OrderShortInfo from '../components/OrderShortInfo';
import PersonalInfo from '../components/PersonalInfo';
import Modal from '../modals/Modal';
import ModalOrder from "../modals/ModalOrder";
import ModalError from "../modals/ModalError";
import PlaceholderOrders from '../placeholders/PlaceholderOrders';

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
    const [allDataLoaded, setAllDataLoaded] = useState(false);

    const [allDeliveries, setAllDeliveries] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState();

    const [errorMessage, setErrorMessage] = useState();
    const [optional, setOptional] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const totalOrders = useRef(0);
    const totalPages = useRef(0);
    const [currentPage, setCurrentPage] = useState(0);

    const availableDroneId = JSON.parse(localStorage.getItem('drone'));

    const getDeliveries = useCallback(async () => {
        try {
            if (!allDataLoaded) {
                const response = await fetch(`http://localhost:8090/delivery?sort=status,id,desc&size=3&page=${currentPage}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
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
                totalOrders.current = data.totalElements;
                totalPages.current = data.totalPages;
                setAllDeliveries(prev => [...prev, ...data.content]);

                if (currentPage === totalPages.current - 1) {
                    setAllDataLoaded(true);
                }
            }
        } catch (error) {
            if (error.message.includes('Failed to fetch')) {
                setErrorMessage('Network error');
                setOptional('Check your Internet connection and the requested URL.');
            } else {
                setErrorMessage('Error getting order history: ' + error.message);
            }
        }
    }, [currentPage, allDataLoaded]);

    const postAndGetDeliveries = useCallback(
        debounce(async (order) => {
            try {
                if (availableDroneId && context.isReadyPostFetch && !hasFetched) {
                    const response = await fetch('http://localhost:8090/delivery/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order)
                    });

                    if (!response.ok) {
                        setHasFetched(true);
                        await getDeliveries();

                        switch (response.status) {
                            case 400:
                                setOptional('Check availability of medications.')
                                throw new Error('Incorrect data sent');
                            case 404:
                                throw new Error('Resource not found for the given request');
                            case 429:
                                throw new Error('Too many requests');
                            case 500:
                                throw new Error('Internal server error');
                            case 503:
                                throw new Error('Service unavailable');
                            default:
                                throw new Error(`Unexpected Error: ${response.status}`);
                        }
                    }

                    const data = await response.json();
                    setCurrentOrderId(data.id);
                    context.remove(order.medicationItems);
                    context.setIsReadyPostFetch(false);
                    setHasFetched(true);
                    setAllDataLoaded(false);

                    await getDeliveries();
                } else if (!hasFetched) {
                    setHasFetched(true);
                    await getDeliveries();
                }
            } catch (error) {
                if (error.message.includes('Failed to fetch')) {
                    setErrorMessage('Network error');
                    setOptional('Check your Internet connection and the requested URL.');
                } else {
                    setErrorMessage('Error order creation: ' + error.message);
                }

                context.setIsReadyPostFetch(false);
            }
        }, 500), [context, hasFetched, getDeliveries]);

    useEffect(() => {
        const order = {
            "droneId": availableDroneId,
            "medicationItems": JSON.parse(localStorage.getItem('selected-items')).map(item => item.id),
        };
        if (!allDataLoaded) {
            postAndGetDeliveries(order);
        }
    }, [hasFetched, availableDroneId, postAndGetDeliveries, allDataLoaded]);

    const handleScroll = debounce(() => {
        const elemScrollTriger = document.getElementById('scroll-point');

        if (elemScrollTriger) {
            const coordElemScrollTriger = elemScrollTriger.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (coordElemScrollTriger.bottom <= windowHeight) {
                setHasFetched(false);

                if (currentPage < totalPages.current) {
                    setCurrentPage(prev => +prev + 1);
                } else if (currentPage >= totalPages.current && totalPages.current === 0) {
                    return;
                } else {
                    setAllDataLoaded(true);
                }
            }
        }
    }, 500);

    useEffect(() => {
        if (!allDataLoaded) {
            window.addEventListener('scroll', handleScroll);
            return (() => {
                window.removeEventListener('scroll', handleScroll);
            })
        }
    }, [allDataLoaded, handleScroll]);

    const ordersList = [...allDeliveries].map(delivery =>
        <OrderShortInfo key={delivery.id} {...delivery} />);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className='orders'>
            {isLoading ? <PlaceholderOrders isLoading={isLoading} setIsLoading={setIsLoading} /> :
                <>
                    <PersonalInfo isLoading={isLoading} setIsLoading={setIsLoading} />
                    <div className='orders-info'>
                        <h1>Orders {!errorMessage && `(${totalOrders.current})`}</h1>
                        <div id='scroll-point' className='all-orders'>
                            {ordersList}
                            {!allDataLoaded && <div className='loader-spinner' />}
                        </div>
                        {!errorMessage &&
                            <button className='back-to-top' onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    left: 0,
                                    behavior: "smooth"
                                });
                            }}>
                                Back to Top <img src="./images/icons/chevron-up.svg" alt="arrow-up" />
                            </button>}
                    </div>
                </>}

            {currentOrderId &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalOrder orderId={currentOrderId} />
                </Modal>
            }

            {errorMessage &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalError errorMessage={errorMessage} optional={optional} />
                </Modal>}
        </div>
    )
}
