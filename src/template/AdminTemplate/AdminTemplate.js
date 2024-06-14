import React, { useState } from 'react'
import { DesktopOutlined, UserOutlined, VideoCameraAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import User from '../../component/User/User';
import { USER_LOGIN } from '../../util/Settings/config';



const { Header, Content, Footer, Sider } = Layout;
const items = [
    getItem('User', '1', <UserOutlined />, [
        getItem(<NavLink to='/admin/users'>User Title</NavLink>, '2', <UserOutlined />),
        getItem(<NavLink to='/admin/users/addusers'>Add User</NavLink>, '6', <UserOutlined />)
    ]),
    getItem('Films', '3', <DesktopOutlined />, [
        getItem(<NavLink to='/admin/films'>Films</NavLink>, '4', <VideoCameraOutlined />),
        getItem(<NavLink to='/admin/films/addnew'>Add Films</NavLink>, '5', <VideoCameraAddOutlined />),

    ]),
];
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        label,
        children
    };
}

export default function AdminTemplate() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if (!localStorage.getItem(USER_LOGIN)) {
        alert("Bạn không có quyền truy cập trang này")
        return <Navigate to='/' />
    }

    if (USER_LOGIN.maLoaiNguoiDung === 'QuanTri') {
        alert("Bạn không có quyền truy cập trang này")
        return <Navigate to='/' />
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>

                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} ></Menu>
            </Sider>
            <Layout>

                <Header style={{ padding: 0, background: colorBgContainer }} >

                    <div style={{ position: 'relative', textAlign: 'right', right: '20px' }}>
                        {/* <img style={{ width: '100px', position: 'absolute', left: '50px' }} src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt='img-logo' ></img> */}
                        {<User />}
                    </div>
                </Header>
                <Content style={{ margin: '0 16px' }}>

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    )
}
