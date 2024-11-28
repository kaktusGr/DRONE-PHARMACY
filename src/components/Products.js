import { React } from "react";
import Product from "./Product";

export default function Products({ allMedications }) {
    return (
        <div className="catalog-products">
            {allMedications.length > 0 ? (
                allMedications.map(item => <Product key={item.id} {...item} />)
            ) : (
                <p className="error">Failed to load product list.</p>
            )}
        </div>
    )
}
