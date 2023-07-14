import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {Link, useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {logOut} from "../../features/userSlice";

const {Item, SubMenu} = Menu;

const Header: React.FC = () => {
    const [current, setCurrent] = useState<string>('home');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    let userEmail = useAppSelector((state) => (state.user.email));

    const handleClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    const handleLogout = () => {
        firebase.auth().signOut();

        dispatch(logOut());

        navigate('/login');
    };

    return (
        <Menu onClick={handleClick} mode="horizontal" selectedKeys={[current]}>
            <Item key="home" icon={<AppstoreOutlined/>}>
                <Link to="/" className='text-decoration-none'>Home</Link>
            </Item>


            {!userEmail && (
                <Item key="login" icon={<UserOutlined/>} className="ms-auto">
                    <Link to="/login" className='text-decoration-none'>Login</Link>
                </Item>
            )}

            {!userEmail && (
                <Item key="register" icon={<UserAddOutlined/>}>
                    <Link to="/register" className='text-decoration-none'>Register</Link>
                </Item>
            )}

            {userEmail && (
                <SubMenu
                    key='subMenu'
                    icon={<SettingOutlined/>}
                    title={userEmail && userEmail.split("@")[0]}
                    className="ms-auto"
                >
                    <Item key="setting:1">Option 1</Item>
                    <Item key="setting:2">Option 2</Item>
                    <Item key='logout' icon={<LogoutOutlined/>} onClick={handleLogout}>
                        Logout
                    </Item>
                </SubMenu>
            )}
        </Menu>
    )
};
export default Header;
