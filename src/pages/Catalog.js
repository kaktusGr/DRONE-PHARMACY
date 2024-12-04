import { React, useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterAside from "../components/FilterAside";
import FilterTop from "../components/FilterTop";
import Product from "../components/Product";
import PlaceholderFilterAside from "../placeholders/PlaceholderFilterAside";
import PlaceholderProducts from "../placeholders/PlaceholderProducts";
import { Context } from "../Context";
import Modal from "../modals/Modal";
import ModalError from "../modals/ModalError";

export default function CatalogMain() {
    const context = useContext(Context);
    const scrollOptions = {
        top: 50,
        left: 0,
        behavior: "smooth"
    };

    const [allMedications, setAllMedications] = useState([]);
    const [availability, setAvailability] = useState(true);
    const refPage = useRef(0);
    const [allPages, setAllPages] = useState(0);
    const [totalMed, setTotalMed] = useState(0);

    const urlFilters = {
        available: "status=AVAILABLE",
        sort: {
            nameAZ: "sort=name,asc",
            nameZA: "sort=name,desc",
            weightUp: "sort=weight,asc",
            weightDown: "sort=weight,desc",
        }
    };
    const [urlSelect, setUrlSelect] = useState(urlFilters.sort.nameAZ);
    const [urlMedication, setUrlMedication] = useState(refPage.current + "&" + urlFilters.available + "&" + urlSelect);

    const [errorMessage, setErrorMessage] = useState();
    const [optional, setOptional] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const navigate = useNavigate();
    const MAX_ATTEMPTS = 5;
    const INTERVAL = 2000;
    const TIMEOUT = 10000;

    useEffect(() => {
        let ignore = false;
        let attempts = 0;
        let intervalId, timeoutId;

        const fetchMedication = async () => {
            try {
                const response = await fetch("/medication?size=6&page=" + urlMedication, {
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
                            setOptional("Please wait for the server's response.");
                            throw new Error('Internal server error');
                        case 503:
                            throw new Error('Service unavailable');
                        default:
                            throw new Error(`Unexpected error: ${response.status}`);
                    }
                }

                const data = await response.json();

                if (!ignore) {
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    setErrorMessage(null);
                    setOptional(null);

                    setAllPages(data.totalPages);
                    setTotalMed(data.totalElements);
                    updateWithCartInfo(data.content);
                }
            } catch (error) {
                if (!ignore) {
                    if (error.message.includes('Failed to fetch')) {
                        setErrorMessage('Network error');
                        setOptional('Check your Internet connection and the requested URL.');
                    } else {
                        setErrorMessage('Error getting medications: ' + error.message);
                    }

                    attempts += 1;
                    if (attempts >= MAX_ATTEMPTS) {
                        clearInterval(intervalId);
                        clearTimeout(timeoutId);
                        navigate('/error');
                    }
                }
            }
        }

        intervalId = setInterval(fetchMedication, INTERVAL);
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            navigate('/error');
        }, TIMEOUT);

        fetchMedication();

        return () => {
            ignore = true;
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            setErrorMessage(null);
            setOptional(null);
        }
    }, [urlMedication, context.cartItemsId]);

    const updateWithCartInfo = (medications) => {
        const updateMedications = medications.map(med => {
            const isInCart = JSON.parse(localStorage.getItem('cart'))?.find(item => item === med.id);
            if (isInCart) {
                return { ...med, status: "UNAVAILABLE" };
            } else {
                return { ...med, status: med.status };
            }
        });
        setAllMedications(updateMedications);
    }

    const toggleAvailable = (value) => {
        refPage.current = 0;
        setAvailability(value);
        setUrlMedication(value
            ? refPage.current + "&" + urlFilters.available + "&" + urlSelect
            : refPage.current + "&" + urlSelect);
    }

    const selectSort = (value) => {
        refPage.current = 0;
        for (let key in urlFilters.sort) {
            if (value === key) {
                setUrlMedication(availability
                    ? refPage.current + "&" + urlFilters.available + "&" + urlFilters.sort[value]
                    : refPage.current + "&" + urlFilters.sort[value]);
                setUrlSelect(urlFilters.sort[value]);
            }
        }
    }

    const currentPage = (value) => {
        switch (value) {
            case "left":
                refPage.current = refPage.current === 0 ? 0 : refPage.current - 1;
                break;
            case "right":
                refPage.current = refPage.current === allPages - 1
                    ? allPages - 1 : refPage.current + 1;
                break;
            default: refPage.current = value;
        }
        setUrlMedication(availability
            ? refPage.current + "&" + urlFilters.available + "&" + urlSelect
            : refPage.current + "&" + urlSelect);
    }

    const addPages = () => {
        const arrPage = [];
        for (let i = 0; i < allPages; i++) {
            arrPage.push(<li key={i} className={i === refPage.current ? "current" : undefined}
                onClick={() => {
                    currentPage(i);
                    window.scrollTo(scrollOptions);
                }}>{i + 1}</li>);
        }
        return arrPage;
    }

    const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingCatalog(false);
            setIsLoadingProducts(false);
        }, 1500);

        return () => {
            clearTimeout(timer);
            setIsLoadingProducts(true);
        };
    }, [urlMedication]);

    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div>
                {isLoadingCatalog ? <PlaceholderFilterAside /> :
                    <FilterAside availability={availability}
                        toggleAvailable={toggleAvailable}
                        totalMed={totalMed} />
                }

                {(!errorMessage || isLoadingCatalog) ?
                    <div className="catalog-filtered">
                        {isLoadingCatalog ?
                            <FilterTop toggleAvailable={toggleAvailable}
                                selectSort={selectSort} /> :
                            <FilterTop availability={availability}
                                toggleAvailable={toggleAvailable}
                                selectSort={selectSort} />
                        }
                        {isLoadingCatalog || isLoadingProducts ? <PlaceholderProducts /> :
                            <div className="catalog-products">
                                {allMedications.map(item => <Product key={item.id} {...item} />)}
                            </div>}
                        <hr />
                        {allMedications.length > 0 &&
                            <div className="catalog-pages">
                                <div className="choose-page">
                                    <button id="left" onClick={() => {
                                        currentPage("left");
                                        window.scrollTo(scrollOptions);
                                    }}>
                                        <img src="./images/icons/chevron-left.svg" alt="arrow-left" />
                                    </button>
                                    <ul className="pages">
                                        {addPages()}
                                    </ul>
                                    <button id="right" onClick={() => {
                                        currentPage("right");
                                        window.scrollTo(scrollOptions);
                                    }}>
                                        <img src="./images/icons/chevron-right.svg" alt="arrow-right" />
                                    </button>
                                </div>
                                <button className="back-to-top" onClick={() => {
                                    window.scrollTo(scrollOptions);
                                }}>
                                    Back to Top <img src="./images/icons/chevron-up.svg" alt="arrow-up" />
                                </button>
                            </div>
                        }
                    </div> :
                    <div className='loader-spinner' />
                }

                {errorMessage &&
                    <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                        <ModalError errorMessage={errorMessage} optional={optional} />
                    </Modal>}
            </div>
        </div>
    )
}
