import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { TOKEN, USER_LOGIN } from '../../util/Settings/config';
import { history } from '../../App';
import { Button, Dropdown, Space } from 'antd';
import ModalProfile from '../ModalProfile/ModalProfile';

export default function User() {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [showModal, setShowModal] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push('/home');
        window.location.reload();

    };

    const items = [

        {
            label: <p>{userLogin.taiKhoan}</p>,
            key: '0',
        },
        // {
        //     label: <NavLink to='/profile'>Proflie</NavLink>,
        //     key: '1',
        // },
        {
            label: <p onClick={() => setShowModal(true)}>
               Thông tin tài khoản
            </p>,
            key: '1',
        },
        {
            label: <p onClick={handleLogout} >Đăng xuất</p>,
            key: '2',

        },
        
    ];



    return (
        <>
            <Dropdown
                menu={{ items }}
                trigger={['click']}
            >
                <Button shape="circle" style={{ width: '50px', height: '50px', fontSize: '15px', fontWeight: 'bold' }} onClick={(e) => e.preventDefault()}>
                    <Space>
                        {userLogin?.taiKhoan?.substr(0, 2)}
                    </Space>
                </Button>
            </Dropdown>
            <ModalProfile visible={showModal} onClose={() => setShowModal(false)} />


        </>
    )
}
