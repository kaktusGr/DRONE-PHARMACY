import React from 'react';
import { Link } from "react-router-dom";
import Discount from './Discount';

export default function DiscountScroll({ props }) {
    const discounts = props.map(p => {
        return <Discount key={p.id} title={p.title} pills={p.pills} />
    });

    return (
        <div className='discount-scroll'>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='catalog'>Catalog</Link></li>
                    <li>Cosmetics</li>
                </ul>
            </nav>
            <div className='scroll'>
                {discounts}
            </div>
        </div>
    )
}