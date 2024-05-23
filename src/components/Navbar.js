import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
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
                            <li><Link to='blog'>Blog</Link></li>
                            <li><Link to='about'>About</Link></li>
                            <li><Link to='contacts'>Contacts</Link></li>
                        </ul>
                    </nav>
                    <div className="header-search">
                        <input type="text"></input>
                        <button>
                            <img src="./images/icons-svg/search.svg" alt="search" />
                        </button>
                    </div>
                    <div className="header-icons">
                        <Link to='account-orders'><img src="./images/icons-svg/user.svg" alt="account" /></Link>
                        <Link to='favourites'><img src="./images/icons-svg/heart.svg" alt="favourites" /></Link>
                        <Link to='shopping-cart'><img src="./images/icons-svg/cart.svg" alt="cart" /></Link>
                    </div>
                </div>
            </div>
        </header>
    )
}