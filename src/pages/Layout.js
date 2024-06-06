import { React, createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const ProductContext = createContext(0);
export const ArchiveContext = createContext(null);
export const Medication = createContext(null);
export const urlOrigin = "http://localhost:8090";

const Layout = () => {
    const [archive, setArchive] = useState([]);
    const [medication, setMedication] = useState(null);

    return (
        <ArchiveContext.Provider value={{ archive, setArchive }}>
            <Navbar />
            <div className='container'>
                <Medication.Provider value={{ medication, setMedication }}>
                    <Outlet />
                </Medication.Provider>
                <Footer />
            </div>
        </ArchiveContext.Provider>
    );
};

export default Layout;