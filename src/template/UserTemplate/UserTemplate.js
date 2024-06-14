/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Outlet } from 'react-router-dom';
function UserTemplate() {
    return (

        <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/free-vector/team-goals-concept-illustration_114360-5175.jpg?t=st=1713321699~exp=1713325299~hmac=2396b78c0267f4c248c4dd631cd9bf670bebfaae7bc3218767db7f8bbc6618ea&w=740" alt="Placeholder Image" className="object-cover w-full h-full" />
            </div>
            <Outlet />
        </div>

    )
}
export default UserTemplate;