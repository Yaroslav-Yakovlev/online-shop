import React, {useState} from 'react';
import UserNav from "../../components/nav/UserNav";
import {auth} from '../../firebase';
import {toast} from "react-toastify";

const UpdatePassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser?.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword('');
                toast.success('UpdatePassword updated');
            })
            .catch(error => {
                setLoading(false);
                toast.error(error.message);
            })
    }


    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Your Password</label>
                    <input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        className='form-control my-3'
                        placeholder='Enter new password'
                        disabled={loading}
                        value={password}
                    />
                    <button className='btn btn-primary my-2'
                            disabled={!password || password.length < 6 || loading}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                    <UserNav/>
                </div>
                <div className='col'>
                    {loading ? (
                        <h4 className='text-danger'>Loading...</h4>
                    ) : (
                        <h4>Password Update</h4>
                    )}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;

