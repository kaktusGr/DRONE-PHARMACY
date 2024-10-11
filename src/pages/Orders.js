import { React, useState, useContext, useEffect, useCallback, useRef } from 'react';
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
    const [allDataLoaded, setAllDataLoaded] = useState(false);

    const [allDeliveries, setAllDeliveries] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const totalOrders = useRef(0);
    const totalPages = useRef(0);
    const [currentPage, setCurrentPage] = useState(0);

    const getDeliveries = useCallback(async () => {
        try {
            if (!allDataLoaded) {
                const response = await fetch(`http://localhost:8090/delivery?sort=status,asc&size=3&page=${currentPage}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
            console.error('Error getting order history: ', error);
        }
    }, [currentPage, allDataLoaded]);

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
                    setAllDataLoaded(false);

                    await getDeliveries();
                } else if (!hasFetched) {
                    setHasFetched(true);
                    await getDeliveries();
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
        if (!allDataLoaded) {
            postAndGetDeliveries(order);
        }
    }, [hasFetched, context, postAndGetDeliveries, allDataLoaded]);

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
    }, 200);

    useEffect(() => {
        if (!allDataLoaded) {
            window.addEventListener('scroll', handleScroll);
            return (() => {
                window.removeEventListener('scroll', handleScroll);
            })
        }
    }, [allDataLoaded, handleScroll])

    const ordersList = [...allDeliveries].map(delivery =>
            <OrderShortInfo key={delivery.id} {...delivery} />);

    return (
        <div className='orders'>
            <PersonalInfo />
            <div className='orders-info'>
                <h1>Orders ({totalOrders.current})</h1>
                <div id='scroll-point' className='all-orders'>
                    {ordersList}
                    {!allDataLoaded && <p>Loading more orders...</p>}
                </div>
                <button className='back-to-top' onClick={() => {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth"
                    });
                }}>
                    Back to Top <img src="./images/icons/chevron-up.svg" alt="arrow-up" />
                </button>
            </div>
            {currentOrderId &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalOrder orderId={currentOrderId} />
                </Modal>
            }
        </div>
    )
}
