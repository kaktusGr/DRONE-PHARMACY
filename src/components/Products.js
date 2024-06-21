import { React, useState, useEffect, useContext } from "react";
import Product from "./Product";
import { Context } from "../Context";

export default function Products() {
    const context = useContext(Context);

    const [items, setItems] = useState([]);

    useEffect(() => {
        let ignore = false;
        fetch(context.urlMedication, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(result => result.json())
            .then(data => {
                if (!ignore) {
                    context.setAllPages(data.totalPages);
                    context.setTotalMed(data.totalElements);
                    setItems(data.content);
                }
            });
        return () => {
            ignore = true;
        }
    }, [context.urlMedication]);

    return (
        <div className="catalog-products">
            {items.length ? (
                items.map(item => <Product key={item.id} {...item} />)
            ) : (
                <p>Failed to load product list</p>
            )}
        </div>
    )
}
