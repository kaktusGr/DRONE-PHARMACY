import { React, useContext } from "react";
import { Context } from "../Context";

export default function Product(props) {
    const { id, status, name, weight, imgUrl } = props;
    const med = { id: id, name: name, status: status, weight: weight };
    const statusMed = status === "AVAILABLE";
    const context = useContext(Context);

    return (
        <div id={"product-" + id} className={statusMed ? "product-card" : "product-card unavailable"}>
            {statusMed ? <img id="med" src={"http://localhost:8090" + imgUrl} alt="medication" />
                : <img id="close" src="./images/icons/plus.svg" alt="close" />}
            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">{name}, {weight}G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons/star.svg" alt="star" /><b>4.3</b>
                    <button disabled={!statusMed}
                        className={statusMed ? "dark-btn" : "dark-btn unavailable"}
                        onClick={() => {
                            context.append(med);
                        }}>
                        {statusMed ? "Add to Cart" : "Unavailable"}
                    </button>
                </div>
            </div>
        </div >
    )
}
