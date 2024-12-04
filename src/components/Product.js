import { React, useContext } from "react";
import { Context } from "../Context";

export default function Product(props) {
    const { id, status, name, weight, imgUrl } = props;
    const context = useContext(Context);

    const productStatus = status === "AVAILABLE";

    return (
        <div id={"product-" + name} className="product-card">
            {!productStatus && <div className="unavailable-med"></div>}
            <div className="product-img">
                <img id="img" src={imgUrl} alt={name} />
            </div>

            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">{name}, {weight}G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons/star.svg" alt="star" /><b>4.3</b>
                    <button disabled={!productStatus}
                        className={productStatus ? "dark-btn" : "dark-btn unavailable"}
                        onClick={() => context.append(id)}>
                        {productStatus ? "Add to Cart" : "Unavailable"}
                    </button>
                </div>
            </div>
        </div >
    )
}
