import { React, useState, useEffect, useContext, useRef } from "react";
import { ArchiveContext, Medication, urlOrigin } from '../pages/Layout';
import FilterAside from "./FilterAside";
import FilterTop from "./FilterTop";
import Product from "./Product";

export default function CatalogMain() {
    const { archive, setArchive } = useContext(ArchiveContext);
    const [availability, setAvailability] = useState(true);
    const { medication, setMedication } = useContext(Medication);

    const refPage = useRef(0);
    const refAllPages = useRef(0);
    const refTotalMed = useRef(0);

    const urlSort = {
        available: "status=AVAILABLE",
        nameAZ: "sort=name,asc",
        nameZA: "sort=name,desc",
        weightUp: "sort=weight,asc",
        weightDown: "sort=weight,desc",
    };
    const [urlSelect, setUrlSelect] = useState(urlSort.nameAZ);

    const urlPath = "/medication";
    const urlSearch = "?size=6&page=";
    const href = urlOrigin + urlPath + urlSearch;

    const [urlMedication, setUrlMedication] = useState(availability
        ? href + refPage.current + "&" + urlSort.available + "&" + urlSelect
        : href + refPage.current + "&" + urlSelect);

    useEffect(() => {
        let ignore = false;
        setMedication(null);
        fetch(urlMedication, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    refAllPages.current = data.totalPages;
                    refTotalMed.current = data.totalElements;
                    setMedication(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, [urlMedication]);

    function updateAvailable(value) {
        refPage.current = 0;

        setAvailability(value);
        setUrlMedication(!availability
            ? href + refPage.current + "&" + urlSort.available + "&" + urlSelect
            : href + refPage.current + "&" + urlSelect);
    }

    function updateSort(value) {
        refPage.current = 0;

        for (let key in urlSort) {
            if (value === key) {
                setUrlMedication(availability
                    ? href + refPage.current + "&" + urlSort.available + "&" + urlSort[key]
                    : href + refPage.current + "&" + urlSort[key]);
                setUrlSelect(urlSort[key]);
            }
        }
    }

    const allMedications = (medication !== null && medication.map(m => {
        return <Product key={m.id} props={m} />
    }));

    const addPages = () => {
        const arrPage = [];
        for (let i = 0; i < refAllPages.current; i++) {
            arrPage.push(<li key={i} className={i === refPage.current ? "current" : undefined}>{i + 1}</li>);
        }
        return arrPage;
    }

    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div>
                <FilterAside availability={availability} updateAvailable={updateAvailable} totalMed={refTotalMed} />
                <div className="catalog-filtered">
                    <FilterTop availability={availability} updateAvailable={updateAvailable} updateSort={updateSort} />
                    <div className="catalog-products">
                        {allMedications}
                    </div>
                    <hr />
                    <div className="catalog-pages">
                        <div className="choose-page">
                            <button id="left" onClick={() => {
                                refPage.current = refPage.current === 0 ? refPage.current = 0 : refPage.current - 1;
                                setUrlMedication(availability
                                    ? href + refPage.current + "&" + urlSort.available + "&" + urlSelect
                                    : href + refPage.current + "&" + urlSelect);
                            }}>
                                <img src="./images/icons-svg/chevron-left.svg" alt="arrow-left" />
                            </button>
                            <ul className="pages">
                                {addPages()}
                            </ul>
                            <button id="right" onClick={() => {
                                refPage.current = refPage.current === refAllPages.current - 1
                                    ? refAllPages.current - 1 : refPage.current + 1;
                                setUrlMedication(availability
                                    ? href + refPage.current + "&" + urlSort.available + "&" + urlSelect
                                    : href + refPage.current + "&" + urlSelect);
                            }}>
                                <img src="./images/icons-svg/chevron-right.svg" alt="arrow-right" />
                            </button>
                        </div>
                        <button className="back-to-top">
                            Back to Top <img src="./images/icons-svg/chevron-up.svg" alt="arrow-up" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}