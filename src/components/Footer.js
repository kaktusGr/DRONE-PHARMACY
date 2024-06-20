import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <h3><Link to="/">air Pharm</Link></h3>
            <div className="footer-column">
                <h4>Company</h4>
                <ul>
                    <li>About</li>
                    <li>Blog</li>
                    <li>Careers</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>support</h4>
                <ul>
                    <li>Contact us</li>
                    <li>Shipping and returns</li>
                    <li>Payment methods</li>
                    <li>FAQs</li>
                    <li>Order status</li>
                    <li>Return order request</li>
                </ul>
            </div>
            <div className="footer-column">
                <h4>social media</h4>
                <div className="footer-icons">
                    <img src="./images/icons/brand-google.svg" alt="google" />
                    <img src="./images/icons/brand-facebook.svg" alt="facebook" />
                    <img src="./images/icons/envelope.svg" alt="mail" />
                    <img src="./images/icons/brand-instagram.svg" alt="instagram" />
                </div>
            </div>
            <div className="footer-column">
                <h4>Mobile app</h4>
                <div className="footer-mobile-app">
                    <img src="./images/google-play.png" alt="google play" />
                    <img src="./images/app-store.png" alt="app store" />
                </div>
            </div>
        </footer>
    )
}
