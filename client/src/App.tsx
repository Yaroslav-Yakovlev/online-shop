import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import {useAppDispatch} from "./hooks";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import UpdatePassword from "./pages/user/UpdatePassword";
import Wishlist from "./pages/user/Wishlist";

import {auth} from "./firebase";
import {logGetInUser} from "./features/userSlice";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {currentUserRequest} from "./functions/auth";

const App: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUserRequest(idTokenResult?.token)
                    .then((res) => {
                        const payload = {
                            name: res.data.name,
                            email: res.data.email,
                            idToken: idTokenResult?.token,
                            role: res.data.role,
                            _id: res.data._id,
                        }
                        dispatch(logGetInUser(payload));

                        navigate('/');
                    })
                    .catch(error => console.log(error));
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='register/complete' element={<RegisterComplete/>}/>
                <Route path='forgot/password' element={<ForgotPassword/>}/>

                <Route element={<UserRoute/>}>
                    <Route path='/user/history' element={<History/>}/>
                    <Route path='/user/password' element={<UpdatePassword/>}/>
                    <Route path='/user/wishlist' element={<Wishlist/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
