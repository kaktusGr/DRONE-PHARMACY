import React from "react";

export default function FilterAside() {
    return (
        <div className="filter-aside">
            <div>
                <h3>Cosmetics</h3>
                <button className="btn-underline">Clear All</button>
            </div>
            <p>1234 results</p>
            <div className="filter-ul">
                <h4>category</h4>
                <ul>
                    <li>
                        <input type="checkbox" />
                        <label>Face Care (321)</label>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <label>Body Care (278)</label>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <label>Hair Care (169)</label>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <label>Hand Care (117)</label>
                    </li>
                    <li>
                        <input type="checkbox" />
                        <label>Makeup (368)</label>
                    </li>
                </ul>
                <button className="btn-underline">Show More</button>
            </div>
            <hr />
            <div className="filter-ul">
                <h4>price</h4>
                <ul>
                    <li>
                        <input type="radio" name="radio" />
                        <label>Under $25</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" defaultChecked />
                        <label>$25 – $50</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" />
                        <label>$50 – $100</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" />
                        <label>$100 – $200</label>
                    </li>
                    <li>
                        <input type="radio" name="radio" />
                        <label>$200 – $500</label>
                    </li>
                </ul>
                <button className="btn-underline">Show More Options</button>
            </div>
            <hr />
            <div className="filter-ul">
                <h4>availability</h4>
                <div className="toggle-container">
                    <input type="checkbox" id="availability" name="availability" />
                    <label htmlFor="availability">
                        <div className="toggle-ball"></div>
                    </label>
                </div>
            </div>
            <hr />
            <div className="filter-ul">
                <h4>brand</h4>
                <div className="custom-select">
                    <select disabled>
                        <option value="">Select brand</option>
                    </select>
                </div>
            </div>
        </div>
    )
}