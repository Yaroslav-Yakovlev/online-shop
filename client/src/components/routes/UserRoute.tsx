import React from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks";

interface UserRouteProps {
    children: React.ReactNode;
}

const UserRoute: React.FC<UserRouteProps> = ({ children, ...rest }) => {
    const { user }  = useAppSelector((state) => state);

    return (
        user && user.idToken ? (
            <Outlet/>
        ) : (
            <h1 className='text-danger'>Loading...</h1>
        )
    )
};

export default UserRoute;
