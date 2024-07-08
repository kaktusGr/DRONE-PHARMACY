import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Orders from './pages/Orders';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import NoPage from './pages/NoPage';

export default function App() {
    document.addEventListener('click', (e) => {
        let link = e.target.closest('a');
        if (!link) return;
        window.scrollTo(0, 0);
    });

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="shopping-cart" element={<ShoppingCart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}
