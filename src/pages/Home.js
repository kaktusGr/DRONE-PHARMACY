import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className='home-page'>
            <h1>A New Era of Pharmacy Delivery</h1>
            <div>
                <Link to='catalog'>Go to Catalog</Link>
                <Link to='orders'>Go to My Orders</Link>
            </div>
        </div>
    )
}
