import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { USER_LOGIN } from './../../util/Settings/config';
function CheckoutTemplate() {

    useEffect(() => {
        window.scrollTo(0, 0);
    })


    if (!localStorage.getItem(USER_LOGIN)) {
        return <Navigate to='/login'></Navigate >
    }



    return (
        <>


            <Outlet />

        </>
    )
}
export default CheckoutTemplate;