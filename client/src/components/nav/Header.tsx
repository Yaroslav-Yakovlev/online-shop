import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";

import {useAppDispatch} from "../../hooks";
import {logOut} from "../../features/userSlice";


const Header: React.FC = () => {
    const [current, setCurrent] = useState<string>('home');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        firebase.auth().signOut();

        const payload = {
            email: '',
            idToken: '',
        };

        dispatch(logOut(payload));

        navigate('/login');
    };


    const items: MenuProps['items'] = [
        {
            label: <Link to='/' className='text-decoration-none'>Home</Link>,
            key: 'home',
            icon: <AppstoreOutlined/>,
        },

        {
            label: 'Username',
            key: 'SubMenu',
            icon: <SettingOutlined/>,

            children: [
                {
                    label: 'Option 1',
                    key: 'setting:1',
                },
                {
                    label: 'Option 2',
                    key: 'setting:2',
                },
                {
                    label: 'Logout',
                    key: 'setting:3',
                    icon: <LogoutOutlined/>,
                    onClick: handleLogout,
                },

            ],
        },

        {
            label: <Link to='/login' className='text-decoration-none'>Login</Link>,
            key: 'login',
            icon: <UserOutlined/>,
            className: 'ms-auto',
        },

        {
            label: <Link to='/register' className='text-decoration-none'>Register</Link>,
            key: 'register',
            icon: <UserAddOutlined/>,
        },
    ];


    return (
        <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className='outline-none'
        />
    )
};
export default Header;
