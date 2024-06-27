import { React, useContext } from "react";
import Product from "./Product";
import { Context } from "../Context";

export default function Products() {
    const context = useContext(Context);

    console.log(context.allMedicines);

    return (
        <div className="catalog-products">
            {context.allMedicines.length ? (
                context.allMedicines.map(item => <Product key={item.id} {...item} />)
            ) : (
                <p>Failed to load product list</p>
            )}
        </div>
    )
    // return (
    //     <div className="catalog-products">
    //         {context.allMedicines.length ? (
    //             context.cartItems.length ? (
    //                 context.allMedicines.map(item => {
    //                     for (let value of context.cartItems) {
    //                         if (item.id === value.id) {
    //                             return <Product key={item.id} status={value.status} {...item} />
    //                         } else {
    //                             return <Product key={item.id} {...item} />
    //                         }
    //                     }
    //                 })
    //             ) : (
    //                 context.allMedicines.map(item => <Product key={item.id} {...item} />)
    //             )
    //         ) : (
    //             <p>Failed to load product list</p>
    //         )}
    //     </div>
    // )
}
