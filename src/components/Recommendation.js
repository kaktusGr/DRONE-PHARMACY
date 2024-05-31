import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";

export default function Recommendation({ details }) {
    const [medication, setMedication] = useState(null);
    
    useEffect(() => {
        let ignore = false;
        setMedication(null);
        fetch("http://localhost:8090/medication?size=4&status=AVAILABLE", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    setMedication(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

    const allMedications = ((medication === null) ? console.log("loading") : medication.map(m => {
        return <Product key={m.id} name={m.name} gram={m.weight} status={m.status} />
    }));

    return (
        <div className="recommendation">
            <Link to="recommendation" className='pill'>recommendation</Link>
            <div className="recommendation-cards">
                {allMedications}
            </div>
        </div>
    )
}