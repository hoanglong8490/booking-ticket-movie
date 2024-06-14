import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Layout/Header/Header';
// import HomeCarousel from './Layout/HomeCarousel/HomeCarousel';
import Footer from './Layout/Footer/Footer';

function HomeTemplate() {

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
        <>
            <Header />

            <Outlet />
            <hr></hr>
            <Footer />
        </>
    )
}
export default HomeTemplate;