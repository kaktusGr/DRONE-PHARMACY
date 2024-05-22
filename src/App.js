import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import AccountOrders from './pages/AccountOrders';
import ShoppingCart from './pages/ShoppingCart';
import ProductPage from './pages/ProductPage';
import OrderStatus from './pages/OrderStatus';
import NoPage from './pages/NoPage';

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="catalog" element={<Catalog />} />
                    <Route path="account-orders" element={<AccountOrders />} />
                    <Route path="shopping-cart" element={<ShoppingCart />} />
                    <Route path="product-page" element={<ProductPage />} />
                    <Route path="order-status" element={<OrderStatus />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}