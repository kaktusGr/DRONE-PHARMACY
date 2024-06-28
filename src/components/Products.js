import { React, useContext } from "react";
import Product from "./Product";
import { Context } from "../Context";

export default function Products() {
    const context = useContext(Context);

    return (
        <div className="catalog-products">
            {context.allMedications.length ? (
                context.allMedications.map(item => <Product key={item.id} {...item} />)
            ) : (
                <p>Failed to load product list</p>
            )}
        </div>
    )
}
