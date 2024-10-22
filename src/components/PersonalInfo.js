import React from 'react';

export default function PersonalInfo(isLoading) {
    return (
        <div className='personal-info'>
            <div>
                <div className={`personal-photo ${isLoading ? 'animated-bg' : ''}`}></div>
                <h3>Full Name</h3>
            </div>
            <div>
                <h4>Personal information</h4>
                <ul>
                    <li>Payment Methods</li>
                    <li>Balance of Funds</li>
                </ul>
            </div>
            <hr />
            <div>
                <h4>Orders</h4>
                <ul>
                    <li>Shopping Cart</li>
                    <li className='active'>Orders</li>
                    <li>Returns</li>
                    <li>Purchased Goods</li>
                    <li>Personal Recommendations</li>
                    <li>Product Comparison</li>
                    <li>Electronic Receipts</li>
                </ul>
            </div>
            <hr />
            <div>
                <h4>Product reviews</h4>
                <ul>
                    <li>My Reviews</li>
                </ul>
            </div>
            <hr />
            <div>
                <h4>Subscriptions</h4>
                <ul>
                    <li>Favourites</li>
                    <li>Notification Settings</li>
                </ul>
            </div>
        </div>
    )
}
