import { React, useContext, useState } from "react";
import { ArchiveContext, Medication, urlOrigin } from '../pages/Layout';

export default function Product({ props }) {
    const { archive, setArchive } = useContext(ArchiveContext);
    const { medication, setMedication } = useContext(Medication);
    const [disabled, setDisabled] = useState(props.status === "AVAILABLE" ? false : true);

    return (
        <div className={disabled ? "product-card unavailable" : "product-card"}>
            {disabled ? <img id="close" src="./images/icons-svg/plus.svg" alt="close" />
                : <img id="med" src={urlOrigin + props.imgUrl} alt="medication" />}
            <div className="product-info">
                <p className="brand">Brand name</p>
                <div className="product-name">
                    <p className="name">{props.name}, {props.gram}G</p>
                    <p className="price">$29.99</p>
                </div>
                <div className="product-hover-block">
                    <img src="./images/icons-svg/star.svg" alt="star" /><b>4.3</b>
                    <button disabled={disabled}
                        className={disabled ? "dark-btn unavailable" : "dark-btn"}
                        onClick={() => {
                            if (!disabled) {
                                setArchive([...archive, props]);
                                setDisabled(true);
                            }
                        }}>
                        {disabled ? "Unavailable" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div >
    )
}