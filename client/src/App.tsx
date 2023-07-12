import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import { useAppDispatch } from "./hooks";
import { auth } from "./firebase";
import { logGetInUser } from "./features/userSlice";
import ForgotPassword from "./pages/auth/ForgotPassword";


const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
         const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                const payload = {
                    email: user.email,
                    idToken: idTokenResult.token,
                };

                dispatch(logGetInUser(payload));
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
            </Routes>
        </>
    );
}

export default App;
