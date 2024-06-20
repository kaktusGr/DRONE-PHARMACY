import React from 'react';
import { Outlet } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ContextProvider } from '../Context';

export default function Layout() {
    return (
        <ContextProvider>
            <Header />
            <div className='container'>
                <Outlet />
                <Footer />
            </div>
        </ContextProvider>
    )
}
