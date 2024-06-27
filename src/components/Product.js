import { React, useState, useContext } from "react";
import { Context } from "../Context";

export default function Product(props) {
    const { id, status, name, weight, imgUrl } = props;
    const context = useContext(Context);

    const [disabled, setDisabled] = useState(status === "AVAILABLE" ? true : false);

    return (
        <div id={"product-" + id} className={disabled ? "product-card" : "product-card unavailable"}>
            {disabled ? <img id="med" src={"http://localhost:8090" + imgUrl} alt="medication" />
                : <img id="close" src="./images/icons/plus.svg" alt="close" />}
            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">{name}, {weight}G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons/star.svg" alt="star" /><b>4.3</b>
                    <button disabled={!disabled}
                        className={disabled ? "dark-btn" : "dark-btn unavailable"}
                        onClick={() => {
                            context.append(id);
                            setDisabled(false);
                        }}>
                        {disabled ? "Add to Cart" : "Unavailable"}
                    </button>
                </div>
            </div>
        </div >
    )
}
