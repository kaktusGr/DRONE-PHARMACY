import { React, useState, useEffect } from "react";
import FilterAside from "./FilterAside";
import FilterTop from "./FilterTop";
import Product from "./Product";

export default function CatalogMain() {
    const [availability, setAvailability] = useState(true);
    const [medication, setMedication] = useState(null);
    const urlMedication = "http://localhost:8090/medication";
    const urlSort = {
        available: "status=AVAILABLE",
        nameAZ: "sort=name,asc",
        nameZA: "sort=name,desc",
        weightUp: "sort=weight,asc",
        weightDown: "sort=weight,desc",
    };
    const [urlSelect, setUrlSelect] = useState(urlSort.nameAZ);
    const [urlFilterMedication, setUrlFilterMedication] = useState(urlMedication + "?" + urlSort.available + "&" + urlSelect);

    useEffect(() => {
        let ignore = false;
        setMedication(null);
        fetch(urlFilterMedication, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setMedication(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, [urlFilterMedication]);

    const allMedications = (medication !== null && medication.map(m => {
        return <Product key={m.id} name={m.name} gram={m.weight} status={m.status} />
    }));

    function updateAvailable(value) {
        setAvailability(value);
        setUrlFilterMedication(!availability
            ? (urlMedication + "?" + urlSort.available + "&" + urlSelect)
            : urlMedication + "?" + urlSelect);
    }

    function updateSort(value) {
        for (let key in urlSort) {
            if (value === key) {
                setUrlFilterMedication(availability
                    ? (urlMedication + "?" + urlSort.available + "&" + urlSort[key])
                    : urlMedication + "?" + urlSort[key]);
                setUrlSelect(urlSort[key]);
            }
        }
    }

    return (
        <div className="catalog">
            <FilterAside availability={availability} updateAvailable={updateAvailable} />
            <div className="catalog-filtered">
                <FilterTop availability={availability} updateAvailable={updateAvailable} updateSort={updateSort} />
                <div className="catalog-products">
                    {allMedications}
                </div>
            </div>
        </div>
    )
}