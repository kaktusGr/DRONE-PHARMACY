import React from "react";
import FilterAside from "./FilterAside";
import FilterTop from "./FilterTop";
import Product from "./Product";

export default function CatalogMain() {
    return (
        <div className="catalog">
            <FilterAside />
            <div className="catalog-filtered">
                <FilterTop />
                <Product />
            </div>
        </div>
    )
}