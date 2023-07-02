import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const config = {
            url: 'http://localhost:3000/register/complete',
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `Email is send to ${email}. Click the link to complete your registration.`
        );
        // save user email in local storage
        window.localStorage.setItem('emailForRegistration', email)
        // clear state
        setEmail('');
    };

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <button type='submit' className='btn btn-primary mt-3'>
            Register
        </button>
    </form>


    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md offset'>
                    <h4>Register</h4>
                    <ToastContainer/>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
