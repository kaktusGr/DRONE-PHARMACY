import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className='container'>
                <Outlet />
                <Footer />
            </div>
        </>
    );
};

export default Layout;