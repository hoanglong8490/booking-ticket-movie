import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import User from '../../../../component/User/User';
export default function Header(props) {
    const { t, i18n } = useTranslation();
    const handleChange = (value) => {
        i18n.changeLanguage(value)
    };
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const renderLogin = () => {
        if (_.isEmpty(userLogin)) {
            return <Fragment>
                <button className="self-center px-8 py-3 rounded" onClick={() => {
                    history.push('/login');
                    window.location.reload();
                }}>{t('signin')}</button>
                <button className="self-center px-8 py-3 font-semibold rounded dark:bg-violet-600 dark:text-gray-50" onClick={() => {
                    history.push('/register');
                    window.location.reload();
                }}>{t('signup')}</button>
            </Fragment>
        } else {
            return <p>{<User />}</p>
        }
    }
    return (
        <header className="p-4 dark:bg-gray-100 dark:text-gray-800 bg-opacity-40 bg-slate-950 text-white font-bold fixed w-full z-10" >
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink rel="noopener noreferrer" to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt='img-logo' ></img>
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <Link rel="noopener noreferrer" to="/home" className="flex items-center px-4 -mb-1 text-decoration-none dark:border- dark:text-violet-600 dark:border-violet-600">Trang chủ</Link>
                    </li>
                    <li className="flex">
                        <Link rel="noopener noreferrer" to="contact" className="flex items-center px-4 -mb-1 text-decoration-none dark:border-">Liên Hệ</Link>
                    </li>
                    <li className="flex">
                        <Link rel="noopener noreferrer" to='/news' className="flex items-center px-4 -mb-1 text-decoration-none dark:border-">Tin tức</Link>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                </div>
                <Space wrap>
                    <Select
                        defaultValue="en"
                        style={{ width: 100 }}
                        onChange={handleChange}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'cn', label: 'China' },
                            { value: 'vn', label: 'VietNam' }
                        ]}
                    />

                </Space>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>
    )
}
