import { React, useState, useRef, useContext, useEffect } from "react";
import FilterAside from "./FilterAside";
import FilterTop from "./FilterTop";
import Products from "./Products";
import { Context } from "../Context";

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

    useEffect(() => {
        let ignore = false;
        fetch("http://localhost:8090/medication?size=6&page=" + urlMedication, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setAllPages(data.totalPages);
                    setTotalMed(data.totalElements);
                    updateWithCartInfo(data.content);
                }
            });
        return () => {
            ignore = true;
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
                refPage.current = refPage.current === 0 ? refPage.current = 0 : refPage.current - 1;
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

    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div>
                <FilterAside availability={availability} toggleAvailable={toggleAvailable} totalMed={totalMed} />
                <div className="catalog-filtered">
                    <FilterTop availability={availability} toggleAvailable={toggleAvailable} selectSort={selectSort} />
                    <Products allMedications={allMedications} />
                    <hr />
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
                </div>
            </div>
        </div>
    )
}
