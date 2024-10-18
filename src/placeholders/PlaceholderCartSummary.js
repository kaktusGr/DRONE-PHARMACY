import { React } from "react";

export default function PlaceholderCartSummary({ btnType }) {
    return (
        <div className="placeholder">
            <div className='summary'>
                <span className="animated-bg animated-title">&nbsp;</span>
                <span className="animated-bg animated-text">&nbsp;</span>
                <span className="animated-bg animated-text">&nbsp;</span>
                <span className="animated-bg animated-title">&nbsp;</span>
                <div className='summary-btns'>
                    <div className='animated-bg animated-block'></div>
                    {btnType === "shopping-cart" && <div className='animated-bg animated-block'></div>}
                </div>
                <span className="animated-bg animated-text">&nbsp;</span>
            </div>
        </div>
    )
}
