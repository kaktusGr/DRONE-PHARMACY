import { React, useState, useContext, useEffect } from 'react';
import { Context } from "../Context";

export default function DroneDetail() {
    const context = useContext(Context);

    const [droneDetail, setDroneDetail] = useState({
        model: "—",
        serialNumber: "—",
        batteryCapacity: "—",
        status: "—",
    });

    useEffect(() => {
        let ignore = false;
        if (context.droneId) {
            fetch(`http://localhost:8090/drone/${context.droneId}/state`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(result => result.json())
                .then(data => {
                    if (!ignore) {
                        console.log(data);
                        const updatedDroneDetail = Object.keys(droneDetail).reduce((accum, key) => {
                            if (data[key] !== undefined) {
                                accum[key] = data[key];
                            }
                            return accum;
                        }, {});
                        setDroneDetail(updatedDroneDetail);
                    }
                });
        }
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className='drone-detail'>
            <table>
                <thead>
                    <tr>
                        <th colSpan='2'><h3>Drone Details</h3></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Drone Type</td>
                        <td>{droneDetail.model}</td>
                    </tr>
                    <tr>
                        <td>Drone Number</td>
                        <td>{droneDetail.serialNumber.slice(6)}</td>
                    </tr>
                    <tr>
                        <td>Capacity</td>
                        <td>{droneDetail.batteryCapacity}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>{droneDetail.status}</td>
                    </tr>
                </tbody>
            </table>
            <div className='attention'>
                <img src="./images/icons/info-circle.svg" alt="attention" />
                <p>Once the drone has landed, it will release the package. Wait until the drone has fully retracted and ascended before approaching the delivered package.</p>
            </div>
        </div>
    )
}
