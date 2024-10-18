import { React } from "react";

export default function PlaceholderProducts() {
    const defaultAmount = [1, 2, 3, 4, 5, 6];

    return (
        <div className="placeholder">
            <div className="catalog-products">
                {defaultAmount.map(item =>
                (<div key={item} className="product-card">
                    <div className="product-img animated-bg"></div>
                    <div className="product-info animated-bg">
                        <span className="animated-text">&nbsp;</span>
                        <span className="animated-title">&nbsp;</span>
                    </div>
                </div>)
                )}
            </div>
        </div>
    )
}
