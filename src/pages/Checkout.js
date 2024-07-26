import { React, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../Context";
import CheckoutDelivery from '../components/CheckoutDelivery';
import CartSummary from '../components/CartSummary';
import DroneDetail from '../components/DroneDetail';

export default function Checkout() {
    const context = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='checkout'>
            <h1>Checkout</h1>
            <div>
                <div className='checkout-details'>
                    <Link to="/shopping-cart">
                        <img src="./images/icons/chevron-up.svg" alt="arrow-up" />Back to Cart
                    </Link>
                    <div className='checkout-customer'>
                        <h3>customer info</h3>
                        <form name="form-customer" action="" method="get">
                            <input type='text' placeholder='First name*'></input>
                            <input type='text' placeholder='Last name*'></input>
                            <input type='phone' placeholder='Phone number*'></input>
                            <input type='email' placeholder='Email'></input>
                        </form>
                    </div>
                    <CheckoutDelivery />
                    <div className='checkout-payment'>
                        <h3>payment</h3>
                        <div className='attention'>
                            <img src="./images/icons/info-circle.svg" alt="attention" />
                            <p>Currently, we accept cash only. Please write in the comments to the order whether you need change and how much.</p>
                        </div>
                    </div>
                </div>

                <div className='checkout-summary'>
                    <div className='checkout-selected-med'>
                        <h3>Selected medications</h3>
                        {context.selectedItems.length > 0 &&
                            <div>
                                {context.selectedItems
                                    .map(item =>
                                        <div key={item.id} className='medications'>
                                            <img id='img' src={"http://localhost:8090" + item.imgUrl} alt={item.name} />
                                            <small>{item.name}</small>
                                        </div>
                                    )}
                            </div>}
                    </div>
                    <DroneDetail />
                    <CartSummary btnType="checkout" />
                    <div className='promo-code'>
                        <div onClick={() => setIsOpen(!isOpen)}>
                            <h3><img src="./images/icons/percentage-circle.svg" alt='percentage' /> Promo code</h3>
                            <img src="./images/icons/chevron-down.svg" alt='arrow-down' />
                        </div>
                        {isOpen && (
                            <form name="form-promo-code" action="" method="get">
                                <input type='text' placeholder='Promo-code'></input>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
