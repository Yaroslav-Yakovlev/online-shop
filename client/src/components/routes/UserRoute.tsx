import React from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import LoadingToRedirect from "./LoadingToRedirect";


const UserRoute: React.FC = () => {
    const { user } = useAppSelector((state) => state);

    return (
        user && user.idToken ? (
            <Outlet/>
        ) : (
            <LoadingToRedirect/>
        )
    )
};

export default UserRoute;
