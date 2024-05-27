import React from "react";

export default function FilterTop() {
    return (
        <div className="filter-top">
            <div className="filter-pills">
                <button>$25 – $50 <img src="./images/icons-svg/plus.svg" alt="close" /></button>
                <button>Available <img src="./images/icons-svg/plus.svg" alt="close" /></button>
            </div>
            <div className="filter-btns">
                <img src="./images/icons-svg/grid.svg" alt="close" />
                <img src="./images/icons-svg/menu.svg" alt="close" />
                <div className="custom-select">
                    <select>
                        <option value="">Sort by: Relevance</option>
                        <option value="">Sort by: A-Z</option>
                        <option value="">Sort by: Z-A</option>
                    </select>
                </div>
            </div>
        </div>
    )
}