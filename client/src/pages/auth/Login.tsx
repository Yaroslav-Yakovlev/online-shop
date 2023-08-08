import React, {useState} from 'react';
import {Button} from "antd";
import {MailOutlined, GoogleOutlined} from '@ant-design/icons';
import {auth, googleAuthProvider} from "../../firebase";
import {useAppDispatch} from "../../hooks";
import {logGetInUser} from "../../features/userSlice";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {AxiosResponse} from 'axios';
import {createOrUpdateUserRequest} from "../../functions/auth";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('yarychyarych@gmail.com');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // const {user} = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user && user.idToken)
    //         navigate('/');
    // }, [user]);

    const roleBasedRedirect = (res: AxiosResponse) => {
        if (res.data.role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/user/history');
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
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

                        roleBasedRedirect(res);
                })

                .catch(error => console.log(error));

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                setLoading(false);
            }
        }
    };

    const googleLogin = async () => {
        const result = await auth.signInWithPopup(googleAuthProvider);
        const {user} = result;
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

                roleBasedRedirect(res);

            })
            .catch(error => console.log(error));
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type='email'
                    className='form-control mt-3'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    placeholder='Your email'
                    autoComplete='username'
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
                    autoComplete="current-password"
                />
            </div>


            <div className="text-center">
                <Button
                    onClick={handleSubmit}
                    type='primary'
                    className='mt-3'
                    block
                    shape='round'
                    icon={<MailOutlined/>}
                    size='large'
                    disabled={!email || password.length < 6}
                >
                    Login with Email/Password
                </Button>
            </div>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    {loading ? (
                        <h4 className='text-danger'>Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}

                    <Button
                        onClick={googleLogin}
                        type='primary' danger
                        className='mt-3'
                        block
                        shape='round'
                        icon={<GoogleOutlined/>}
                        size='large'
                    >
                        Login with Google
                    </Button>

                    <Link to='/forgot/password' className='text-danger text-decoration-none float-end mt-3'>
                        Forgot Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

