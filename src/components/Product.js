import React from "react";

export default function Product({ brand, name, gram, price, stars, status }) {
    return (
        <div className="product-card">
            <div className="product-info">
                <p className="brand">{brand}</p>
                <div className="product-name">
                    <p className="name">{name}, {gram}</p>
                    <p className="price">{price}</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons-svg/star.svg" alt="star" /><b>{stars}</b>
                    <div className="product-small-info">
                        <small>{status}</small>
                        <div>
                            <img src="./images/icons-svg/arrow-left-right.svg" alt="star" />
                            <small>Compare</small>
                        </div>
                    </div>
                    <button className="dark-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}