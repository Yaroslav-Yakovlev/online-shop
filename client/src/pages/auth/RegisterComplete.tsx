import React, {useState, useEffect} from 'react';
import {auth} from '../../firebase';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks";
import {logGetInUser} from "../../features/userSlice";
import {createOrUpdateUserRequest} from "../../functions/auth";

const RegisterComplete: React.FC = () => {
    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        // validation

        if (!email || !password) {
            toast.error('Email and password is required');
            return;
        }

        if (password.length < 6) {
            toast.error('UpdatePassword must be at least 6 characters long');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email ?? '',
                window.location.href
            );

            if (result.user?.emailVerified) {
                window.localStorage.removeItem('emailForRegistration');

                let user = auth.currentUser;
                await user?.updatePassword(password);
                const idTokenResult = await user?.getIdTokenResult();

                createOrUpdateUserRequest(idTokenResult?.token)
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

                navigate('/');
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const CompleteRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control'
                value={email ?? ''}
                disabled
            />

            <br/>

            <input
                type='password'
                className='form-control'
                value={password ?? ''}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='UpdatePassword'
                autoFocus
                autoComplete="current-password"
            />

            <button type='submit' className='btn btn-primary mt-3'>
                Complete Register
            </button>
        </form>
    );

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md offset'>
                    <h4>Register Complete</h4>
                    {CompleteRegisterForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;

