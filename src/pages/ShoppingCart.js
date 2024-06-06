import { React, useContext } from 'react';
import { ArchiveContext } from '../pages/Layout';
import Product from "../components/Product";

export default function ShoppingCart() {
    const { archive } = useContext(ArchiveContext);

    console.log(archive);
    const chosenMedication = archive.map(m => {
        console.log(m);
        return (
            <Product key={m.id} props={m} />
        )
    })

    return (
        <div className='shopping-cart'>
            <h1>{archive.length !== 0 ? `Shopping cart (${archive.length})` : "Shopping cart"}</h1>
            <ul>
                {chosenMedication}
            </ul>
        </div>
    )
}