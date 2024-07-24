import { React, useContext } from "react";
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

    const addPages = () => {
        const arrPage = [];
        for (let i = 0; i < context.allPages; i++) {
            arrPage.push(<li key={i} className={i === context.refPage ? "current" : undefined}
                onClick={() => {
                    context.currentPage(i);
                    window.scrollTo(scrollOptions);
                }}>{i + 1}</li>);
        }
        return arrPage;
    }

    return (
        <div className="catalog">
            <h1>Catalog</h1>
            <div>
                <FilterAside />
                <div className="catalog-filtered">
                    <FilterTop />
                    <Products />
                    <hr />
                    <div className="catalog-pages">
                        <div className="choose-page">
                            <button id="left" onClick={() => {
                                context.currentPage("left");
                                window.scrollTo(scrollOptions);
                            }}>
                                <img src="./images/icons/chevron-left.svg" alt="arrow-left" />
                            </button>
                            <ul className="pages">
                                {addPages()}
                            </ul>
                            <button id="right" onClick={() => {
                                context.currentPage("right");
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
