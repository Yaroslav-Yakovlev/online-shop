import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {useAppSelector} from "../../hooks";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdminRequest} from "../../functions/auth";
import {AxiosResponse} from "axios";

const AdminRoute: React.FC = () => {
    const { user } = useAppSelector((state) => state);
    const [ok, setOk] = useState<boolean>(false);

    useEffect(() => {
        if (user && user.idToken) {
            currentAdminRequest(user.idToken)
                .then((res: AxiosResponse) => {
                    console.log('current admin res', res);
                    setOk(true);
                })
                .catch((error) => {
                    console.log('admin route error', error);
                });
        }
    },[user]);

    return (
        ok ? (
            <Outlet/>
        ) : (
            <LoadingToRedirect/>
        )
    )
};

export default AdminRoute;
