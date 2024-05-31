import { React } from "react";

export default function FilterTop({ availability, updateAvailable, updateSort }) {
    return (
        <div className="filter-top">
            <div className="filter-pills">
                <button>$25 – $50 <img src="./images/icons-svg/plus.svg" alt="close" /></button>
                {availability && <button onClick={() => {
                    updateAvailable(!availability);
                }}>Available <img src="./images/icons-svg/plus.svg" alt="close" /></button>}
            </div>
            <div className="filter-btns">
                <img src="./images/icons-svg/grid.svg" alt="close" />
                <img src="./images/icons-svg/menu.svg" alt="close" />
                <div className="custom-select">
                    <select id="filterTop" onChange={(event) => {
                        updateSort(event.target.value);
                    }}>
                        {/* <option value="relevance">Sort by: Relevance</option> */}
                        <option value="nameAZ">Sort by: A-Z</option>
                        <option value="nameZA">Sort by: Z-A</option>
                        <option value="weightUp">Sort by: Weight (up)</option>
                        <option value="weightDown">Sort by: Weight (down)</option>
                    </select>
                </div>
            </div>
        </div>
    )
}