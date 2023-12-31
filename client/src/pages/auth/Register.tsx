import React, {useState, useEffect} from 'react';
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";


const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const {user} = useAppSelector((state) => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.idToken) {
            navigate('/');
        }
    }, [user]);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL || '',
            handleCodeInApp: true,
        };

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `Email is send to ${email}. Click the link to complete your registration.`
        );
        window.localStorage.setItem('emailForRegistration', email);

        setEmail('');
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder='Your email'
                autoComplete='username'
            />

            <button type='submit' className='btn btn-primary mt-3'>
                Register
            </button>
        </form>
    );


    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md offset'>
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;
