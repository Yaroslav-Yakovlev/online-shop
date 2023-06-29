import React, {useState} from 'react';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const items: MenuProps['items'] = [
    {
        label: <Link to='/'>Home</Link>,
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


        ],
    },

    {
        label: <Link to='/login'>Login</Link>,
        key: 'login',
        icon: <UserOutlined/>,
        className: 'ms-auto',
    },

    {
        label: <Link to='/register'>Register</Link>,
        key: 'register',
        icon: <UserAddOutlined/>,
    },
];


const Header: React.FC = () => {
    const [current, setCurrent] = useState<string>('home');

    const handleClick: MenuProps['onClick'] = (e): void => {
        setCurrent(e.key);
    };

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
