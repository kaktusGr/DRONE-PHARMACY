import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from "../modals/Modal";
import ModalError from "../modals/ModalError";

export default function DroneDetail() {
    const [droneDetail, setDroneDetail] = useState({
        model: "—",
        serialNumber: "—",
        batteryCapacity: "—",
        weightLimit: "—",
        status: "—",
    });

    const [errorMessage, setErrorMessage] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const navigate = useNavigate();

    const availableDroneId = JSON.parse(localStorage.getItem('drone'));

    useEffect(() => {
        let ignore = false;
        const fetchDroneDetail = async () => {
            try {
                if (availableDroneId) {
                    const response = await fetch(`/drone/${availableDroneId}/state`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    })

                    if (!response.ok) {
                        switch (response.status) {
                            case 400:
                                throw new Error('Bad request sent');
                            case 404:
                                throw new Error('Resource not found for the given request');
                            case 429:
                                throw new Error('Too many requests');
                            case 500:
                                throw new Error('Internal server error');
                            case 503:
                                throw new Error('Service unavailable');
                            default:
                                throw new Error(`Unexpected error: ${response.status}`);
                        }
                    }

                    const data = await response.json();

                    if (!ignore) {
                        const updatedDroneDetail = Object.keys(droneDetail).reduce((accum, key) => {
                            if (data[key] !== undefined) {
                                if (key === "serialNumber") {
                                    accum[key] = data[key].slice(6);
                                } else {
                                    accum[key] = data[key];
                                }
                            }
                            return accum;
                        }, {});
                        setDroneDetail(updatedDroneDetail);
                    }
                } else {
                    navigate('/shopping-cart');
                }
            } catch (error) {
                setErrorMessage("Error getting drone's detail: " + error.message);
            }
        }
        fetchDroneDetail();

        return () => {
            ignore = true;
        }
    }, [availableDroneId]);

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
                        <td>{droneDetail.serialNumber}</td>
                    </tr>
                    <tr>
                        <td>Capacity</td>
                        <td>{droneDetail.batteryCapacity}</td>
                    </tr>
                    <tr>
                        <td>Weight Limit</td>
                        <td>{droneDetail.weightLimit}</td>
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

            {errorMessage &&
                <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                    <ModalError errorMessage={errorMessage} />
                </Modal>}
        </div>
    )
}
