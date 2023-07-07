import React, {useState} from 'react';
import {Button} from "antd";
import {MailOutlined} from '@ant-design/icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    const handleButtonClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(email, password);
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type='email'
                className='form-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder='Your email'
            />
            </div>

            <br/>

            <div className="form-group">
                <input
                    type='password'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Your password'
                />
            </div>

            <Button
                onClick={handleButtonClick}
                type='primary'
                className='mt-4'
                block
                shape='round'
                icon={<MailOutlined/>}
                size='large'
                disabled={!email || password.length < 6}
            >
                Login with Email/Password
            </Button>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md offset'>
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    );
};

export default Login;

