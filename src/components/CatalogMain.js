import React from "react";
import FilterAside from "./FilterAside";
import FilterTop from "./FilterTop";
import Product from "./Product";

export default function CatalogMain() {
    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div>
                <FilterAside />
                <div className="catalog-filtered">
                    <FilterTop />
                    <div className="catalog-products">
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                        <Product />
                    </div>
                    <hr />
                    <div className="catalog-pages">
                        <div className="choose-page">
                            <button id="left">
                                <img src="./images/icons/chevron-left.svg" alt="arrow-left" />
                            </button>
                            <ul className="pages">
                                <li className="current">1</li>
                                <li>2</li>
                                <li>3</li>
                            </ul>
                            <button id="right">
                                <img src="./images/icons/chevron-right.svg" alt="arrow-right" />
                            </button>
                        </div>
                        <button className="back-to-top">
                            Back to Top <img src="./images/icons/chevron-up.svg" alt="arrow-up" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
