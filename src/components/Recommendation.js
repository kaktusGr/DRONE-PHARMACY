import React from "react";
import { Link } from "react-router-dom";
import Product from "./Product";

export default function Recommendation({ details }) {
    const productDetail = details.map(d => {
        return (
            <Product key={d.id} brand={d.brand} name={d.name} gram={d.gram} price={d.price} stars={d.stars} status={d.status} />
        )
    });

    return (
        <div className="recommendation">
            <Link to="recommendation" className='pill'>recommendation</Link>
            <div className="recommendation-cards">
                {productDetail}
            </div>
        </div>
    )
}