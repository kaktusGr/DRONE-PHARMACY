import { React, useState, useContext } from "react";
import { Context } from "../Context";

export default function Product(props) {
    const { id, status, name, weight, imgUrl } = props;
    const item = { id: id, name: name, status: status };
    const context = useContext(Context);

    const [disabled, setDisabled] = useState(status === "AVAILABLE" ? false : true);

    return (
        <div id={"product-" + id} className={disabled ? "product-card unavailable" : "product-card"}>
            {disabled ? <img id="close" src="./images/icons/plus.svg" alt="close" />
                : <img id="med" src={"http://localhost:8090" + imgUrl} alt="medication" />}
            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">{name}, {weight}G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons/star.svg" alt="star" /><b>4.3</b>
                    <button disabled={disabled}
                        className={disabled ? "dark-btn unavailable" : "dark-btn"}
                        onClick={() => {
                            context.append(item, 1);
                            setDisabled(true);
                        }}>
                        {disabled ? "Unavailable" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div >
    )
}
