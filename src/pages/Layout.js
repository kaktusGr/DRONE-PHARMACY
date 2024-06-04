import { React, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const ProductContext = createContext(0);

const Layout = () => {
    const [countProducts, setCountProducts] = useState(0);

    return (
        <ProductContext.Provider value={{ countProducts, setCountProducts }}>
            <Navbar />
            <div className='container'>
                <Outlet />
                <Footer />
            </div>
        </ProductContext.Provider>
    );
};

export default Layout;