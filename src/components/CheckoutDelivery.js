import { React } from 'react';

const getDay = function (value) {
    if (arguments.length > 1) {
        throw new Error("Too many arguments provided");
    }

    const now = new Date();
    const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    switch (value) {
        case "today":
            break;
        case "tomorrow":
            now.setDate(now.getDate() + 1);
            break;
        case "dayAfterTomorrow":
            now.setDate(now.getDate() + 2);
            break;
        default:
            throw new Error("Invalid value provided");
    }
    return week[now.getDay()];
}

const setDateAfterTomorrow = function () {
    if (arguments.length > 0) {
        throw new Error("Unnecessary argument provided");
    }

    const now = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    now.setDate(now.getDate() + 2);
    return `${months[now.getMonth()]} ${now.getDate()}`;
}

export default function CheckoutDelivery() {
    function handleClick(e) {
        if (!e.target.closest('.date.active')) {
            document.querySelectorAll('.active').forEach(item => item.classList.remove('active'));
        }
        e.target.closest('.date').classList.toggle('active');
    }

    return (
        <div className='checkout-delivery'>
            <h3>Delivery</h3>
            <div className='delivery-inputs'>
                <div id='when'>
                    <div>
                        <h4>When to deliver your order?</h4>
                        <p>Choose a convenient delivery date and time</p>
                    </div>
                    <div className='delivery-dates'>
                        <div className='date active' onClick={handleClick}>
                            <p>{getDay("today")}</p>
                            <p>Today</p>
                        </div>
                        <div className='date' onClick={handleClick}>
                            <p>{getDay("tomorrow")}</p>
                            <p>Tomorrow</p>
                        </div>
                        <div className='date' onClick={handleClick}>
                            <p>{getDay("dayAfterTomorrow")}</p>
                            <p>{setDateAfterTomorrow()}</p>
                        </div>
                    </div>
                    <ul className='delivery-times'>
                        <li>
                            <input type="radio" name="time" value="asap" defaultChecked />
                            <label htmlFor='asap'>ASAP</label>
                        </li>
                        <li>
                            <input type="radio" name="time" value="8-10" />
                            <label htmlFor='8-10'>8:00 AM — 10:00 AM</label>
                        </li>
                        <li>
                            <input type="radio" name="time" value="10-12" />
                            <label htmlFor='10-12'>10:00 AM — 12:00 PM</label>
                        </li>
                        <li>
                            <input type="radio" name="time" value="12-2" />
                            <label htmlFor='12-2'>12:00 PM — 2:00 PM</label>
                        </li>
                        <li>
                            <input type="radio" name="time" value="2-4" />
                            <label htmlFor='2-4'>2:00 PM — 4:00 PM</label>
                        </li>
                        <li>
                            <input type="radio" name="time" value="4-6" />
                            <label htmlFor='4-6'>4:00 PM — 6:00 PM</label>
                        </li>
                    </ul>
                </div>
                <div id='where'>
                    <div>
                        <h4>Where to deliver your order?</h4>
                        <p>Enter the address or use the map</p>
                    </div>
                    <form name="form-address" action="" method="get">
                        <input type='text' placeholder='Address*'></input>
                        <input type='text' placeholder='Delivery comment'></input>
                    </form>
                    <div className='map'>
                        <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d5745812.178461732!2d22.0656967!3d45.3170636!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2srs!4v1720444257584!5m2!1sen!2srs" allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
            <div className='attention'>
                <img src="./images/icons/info-circle.svg" alt="attention" />
                <p>Ensure the delivery area is clear of obstacles. The drone requires a flat, open space to land safely. Recommended dimensions for the landing area are 2×2 meters.</p>
            </div>
        </div>
    )
}

export { getDay, setDateAfterTomorrow };
