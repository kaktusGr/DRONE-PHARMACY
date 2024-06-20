import { React, useContext } from "react";
import { Context } from "../Context";

export default function FilterTop() {
    const context = useContext(Context);

    return (
        <div className="filter-top">
            <div className="filter-pills">
                {context.availability && <button onClick={() => {
                    context.toggleAvailable(!context.availability);
                }}>Available <img src="./images/icons/plus.svg" alt="close" /></button>}
            </div>
            <div className="filter-btns">
                <img src="./images/icons/grid.svg" alt="grid" />
                <img src="./images/icons/menu.svg" alt="menu" />
                <div className="custom-select">
                    <select id="filterTop" onChange={(e) => {
                        context.selectSort(e.target.value);
                    }}>
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
