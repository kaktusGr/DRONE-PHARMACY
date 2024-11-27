import { React } from "react";
import PersonalInfo from "../components/PersonalInfo";

export default function PlaceholderOrders({ isLoading, setIsLoading }) {
    const defaultAmount = [1, 2, 3];

    return (
        <div className="placeholder">
            <div className="orders">
                <PersonalInfo isLoading={isLoading} setIsLoading={setIsLoading} />
                <div className='orders-info'>
                    <h1>Orders</h1>
                    <div className='all-orders'>
                        {defaultAmount.map(item => (
                            <div key={item} className='order-short-info'>
                                <div className='order-title'>
                                    <span className="animated-bg animated-title">&nbsp;</span>
                                    <span className="animated-bg animated-title">&nbsp;</span>
                                </div>
                                <span className="order-number animated-bg animated-text">&nbsp;</span>
                                <div className='order-info'>
                                    <div className='delivery-data'>
                                        <span className="animated-bg animated-title">&nbsp;</span>
                                        <span className="animated-bg animated-text">&nbsp;</span>
                                        <span className="animated-bg animated-title">&nbsp;</span>
                                        <span className="animated-bg animated-text">&nbsp;</span>
                                        <span className="animated-bg animated-title">&nbsp;</span>
                                        <span className="animated-bg animated-text">&nbsp;</span>
                                    </div>
                                    <div className='delivery-items'>
                                        <div className="medications animated-bg"></div>
                                        {item > 1 && <div className="medications animated-bg"></div>}
                                    </div>
                                </div>
                                <div className='order-btns'>
                                    <div className="animated-bg animated-block"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
