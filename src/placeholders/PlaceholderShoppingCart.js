import { React } from "react";

export default function PlaceholderShoppingCart() {
    const defaultAmount = [1, 2];

    return (
        <div className="placeholder">
            <div>
                <div className='selected-btn'>
                    <div className="animated-bg"></div>
                    <div className="animated-bg"></div>
                </div>
            </div>
            <div className="cart-items">
                <span className="animated-title animated-bg">&nbsp;</span>
                {defaultAmount.map(item =>
                (<div key={item}>
                    <div className="cart-item">
                        <span></span>
                        <div className="medications animated-bg"></div>
                        <label>
                            <div>
                                <span className="animated-text animated-bg">&nbsp;</span>
                                <span className="animated-title animated-bg">&nbsp;</span>
                            </div>
                            <div>
                                <span className="animated-text animated-bg">&nbsp;</span>
                                <span className="animated-title animated-bg">&nbsp;</span>
                            </div>
                        </label>
                    </div>
                    <hr />
                </div>)
                )}
            </div>
        </div>
    )
}
