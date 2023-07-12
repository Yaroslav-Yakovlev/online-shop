import React, {useState} from 'react';
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT || '',
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail('');
                setLoading(false);
                toast.success('Check your email password reset link');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <div className='container col-md-6 offset-md p-5'>
            {loading ? (<h4 className='text-danger'>Loading...</h4>
            ) : (
                <h4>Forgot Password</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    value={email}
                    className='form-control'
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    placeholder='Type your email'
                />
                <br/>
                <button className='btn btn-primary' disabled={!email}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
