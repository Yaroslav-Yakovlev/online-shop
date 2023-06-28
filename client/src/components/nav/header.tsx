import React, {useState} from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        label: 'Home',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Register',
        key: 'SubMenu',
        icon: <SettingOutlined />,
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
        key: 'alipay',
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('');

    const handleClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" items={items} />
    )
};
export default Header;
