import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="header-help-btn">
                    <ul>
                        <li>Find a Store</li>
                        <li>Help</li>
                        <li>Sign In</li>
                    </ul>
                </div>
                <div className="header-main">
                    <h3><Link to="/">air Pharm</Link></h3>
                    <nav>
                        <ul>
                            <li><Link to='catalog'>Catalog</Link></li>
                            <li><Link to='orders'>History Orders</Link></li>
                            <li><Link to='shopping-cart'>Shopping Cart</Link></li>
                        </ul>
                    </nav>
                    <div className="header-search">
                        <input type="text"></input>
                        <button>
                            <img src="./images/icons/search.svg" alt="search" />
                        </button>
                    </div>
                    <div className="header-icons">
                        <Link to='orders'><img src="./images/icons/user.svg" alt="account" /></Link>
                        <Link to='favourites'><img src="./images/icons/heart.svg" alt="favourites" /></Link>
                        <Link to='shopping-cart'>
                            <img src="./images/icons/cart.svg" alt="cart" />
                            <span className="count-products">0</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
