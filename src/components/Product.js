import React from "react";

export default function Product() {
    return (
        <div className="product-card">
            <img id="close" src="./images/icons/plus.svg" alt="close" />
            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">Medicine, 50G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons/star.svg" alt="star" /><b>4.3</b>
                    <button className="dark-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div >
    )
}
