import { React, useContext, useEffect } from 'react';
import { Context } from "../Context";

export default function Orders() {
    const context = useContext(Context);

    const order = {
        "droneId": context.droneId,
        "medicationItems": context.selectedItems.map(item => item.id),
    };

    useEffect(() => {
        let ignore = false;
        if (context.droneId) {
            fetch(`http://localhost:8090/delivery/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            })
                .then(result => result.json())
                .then(data => {
                    if (!ignore) {
                        console.log(data);
                        context.remove(order.medicationItems);
                    }
                });
        }
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className='orders'>
            <h1>Orders</h1>
        </div>
    )
}
