import { React } from "react";
import { Link } from "react-router-dom";
import PlaceholderCartSummary from "./PlaceholderCartSummary";

export default function PlaceholderCheckout() {
    return (
        <div className="placeholder">
            <div className='checkout-main'>
                <div className='checkout-details'>
                    <Link to="/shopping-cart">
                        <img src="./images/icons/chevron-up.svg" alt="arrow-up" />Back to Cart
                    </Link>
                    <div className='checkout-customer'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                        <form>
                            <span className="animated-bg animated-block">&nbsp;</span>
                            <span className="animated-bg animated-block">&nbsp;</span>
                            <span className="animated-bg animated-block">&nbsp;</span>
                            <span className="animated-bg animated-block">&nbsp;</span>
                        </form>
                    </div>
                    <div className='checkout-delivery'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                        <div className='delivery-inputs'>
                            <div id='when'>
                                <div>
                                    <span className="animated-bg animated-text">&nbsp;</span>
                                    <span className="animated-bg animated-text">&nbsp;</span>
                                </div>
                                <div className='delivery-dates'>
                                    <span className="animated-bg animated-block">&nbsp;</span>
                                    <span className="animated-bg animated-block">&nbsp;</span>
                                    <span className="animated-bg animated-block">&nbsp;</span>
                                </div>
                                <span className="animated-bg animated-text">&nbsp;</span>
                                <span className="animated-bg animated-text">&nbsp;</span>
                                <span className="animated-bg animated-text">&nbsp;</span>
                                <span className="animated-bg animated-text">&nbsp;</span>
                                <span className="animated-bg animated-text">&nbsp;</span>
                                <span className="animated-bg animated-text">&nbsp;</span>
                            </div>
                            <div id='where'>
                                <div>
                                    <span className="animated-bg animated-text">&nbsp;</span>
                                    <span className="animated-bg animated-text">&nbsp;</span>
                                </div>
                                <form>
                                    <span className="animated-bg animated-block">&nbsp;</span>
                                    <span className="animated-bg animated-block">&nbsp;</span>
                                </form>
                                <div className='map'>
                                    <div id="img" className="animated-bg"></div>
                                </div>
                            </div>
                        </div>
                        <div className='attention animated-bg'>
                            <span>&nbsp;</span>
                        </div>
                    </div>
                    <div className='checkout-payment'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                        <div className='attention animated-bg'>
                            <span>&nbsp;</span>
                        </div>
                    </div>
                </div>

                <div className='checkout-summary'>
                    <div className='checkout-selected-med'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                        <div>
                            <div className="medications animated-bg"></div>
                            <div className="medications animated-bg"></div>
                        </div>
                    </div>
                    <div className='drone-detail'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                        <span className="animated-bg animated-text">&nbsp;</span>
                        <span className="animated-bg animated-text">&nbsp;</span>
                        <span className="animated-bg animated-text">&nbsp;</span>
                        <span className="animated-bg animated-text">&nbsp;</span>
                        <span className="animated-bg animated-text">&nbsp;</span>
                        <div className='attention animated-bg'>
                            <span>&nbsp;</span>
                        </div>
                    </div>
                    <PlaceholderCartSummary />
                    <div className='promo-code'>
                        <span className="animated-bg animated-title">&nbsp;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
