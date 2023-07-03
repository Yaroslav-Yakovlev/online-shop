import React, { useState, useEffect } from 'react';



const RegisterComplete: React.FC = () => {
    const [email, setEmail] = useState<string | null>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    },[])

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    const CompleteRegisterForm = () => <form onSubmit={handleSubmit}>
        <input
            type='email'
            className='form-control'
            value={email ?? ''}
            disabled
        />

        <input
            type='password'
            className='form-control'
            value={password ?? ''}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            autoFocus
        />

        <button type='submit' className='btn btn-primary mt-3'>
           Complete Register
        </button>
    </form>


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

