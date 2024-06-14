/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// import { addNguoiDung } from '../../../../redux/actions/QuanLyNguoiDungSaga';
import { GROUPID } from '../../../../util/Settings/config';
export default function AddUser() {

    const { danhSachLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_LOAI_NGUOI_DUNG',
            danhSachLoaiNguoiDung
        })
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneNumberRegex = /^\d{10}$/;
        return phoneNumberRegex.test(phoneNumber);
    };

    const isValidUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        return usernameRegex.test(username);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            hoTen: '',
            email: '',
            soDT: '',
            taiKhoan: '',
            matKhau: '',
            maLoaiNguoiDung: '',
        },
        validate: values => {
            const errors = {};

            if (!values.hoTen) {
                errors.hoTen = 'Vui lòng nhập họ tên';
            }

            if (!values.email) {
                errors.email = 'Vui lòng nhập email';
            } else if (!isValidEmail(values.email)) {
                errors.email = 'Email không hợp lệ';
            }

            if (!values.soDT) {
                errors.soDT = 'Vui lòng nhập số điện thoại';
            } else if (!isValidPhoneNumber(values.soDT)) {
                errors.soDT = 'Số điện thoại không hợp lệ';
            }
            if (!values.taiKhoan) {
                errors.taiKhoan = 'Vui lòng nhập tài khoản';
            } else if (!isValidUsername(values.taiKhoan)) {
                errors.taiKhoan = 'Tài khoản không hợp lệ'
            }
            if (!values.matKhau) {
                errors.matKhau = 'Vui lòng nhập mật khẩu';
            } else if (!isValidPassword(values.matKhau)) {
                errors.matKhau = 'Mật khẩu  không hợp lệ'
            }
            if (!values.maLoaiNguoiDung) {
                errors.maLoaiNguoiDung = 'Vui lòng chọn loại người dùng'
            }


            return errors;
        },
        onSubmit: values => {
            values.maNhom = GROUPID
            let formData = new FormData();
            if (Object.keys(formik.errors).length === 0) {
                for (let key in values) {
                    formData.append(key, values[key]);
                }

            }
            dispatch({
                type:'GET_THEM_NGUOI_DUNG',
                formData:values
            })
            console.log('values', values)

        }
    },
    );

    const renderSelect = () => {
        if (Array.isArray(danhSachLoaiNguoiDung)) {
            return danhSachLoaiNguoiDung.map((value, index) => {
                return <Select.Option key={index} value={value.maLoaiNguoiDung}>{value.tenLoai}</Select.Option>
            })
        } else {

            return null;
        }
    }
    const handleSelectChange = (value) => {

        formik.setFieldValue('maLoaiNguoiDung', value);
    };


    return (
        <div>

            <div className="bg-gray-100 flex justify-center items-center h-screen">

                <div className="w-1/2 h-screen hidden lg:block">
                    <img src="https://img.freepik.com/free-vector/forms-concept-illustration_114360-4957.jpg?t=st=1713942436~exp=1713946036~hmac=233070f0f4086638708a87d14b63ed42ddf7bb0dfc51f8efa87d9a125b5cbe99&w=740" alt='logo' className="object-cover w-full h-full" />
                </div>

                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-4">Thêm Người Dùng</h1>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Tên người dùng " validateStatus={formik.errors.hoTen && 'error'} help={formik.errors.hoTen} >
                            <Input id='hoTen' name='hoTen' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Email " validateStatus={formik.errors.email && 'error'} help={formik.errors.email}  >
                            <Input id='email' name='email' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" validateStatus={formik.errors.soDT && 'error'} help={formik.errors.soDT} >
                            <Input id='soDT' name='soDT' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Tài khoản " validateStatus={formik.errors.taiKhoan && 'error'} help={formik.errors.taiKhoan} >
                            <Input id='taiKhoan' name='taiKhoan' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mật khẩu " validateStatus={formik.errors.matKhau && 'error'} help={formik.errors.matKhau} >
                            <Input.Password id='matKhau' name='matKhau' onChange={formik.handleChange} />
                        </Form.Item>
                        <Form.Item label="Mã người dùng" validateStatus={formik.errors.maLoaiNguoiDung && 'error'} help={formik.errors.maLoaiNguoiDung}>
                            <Select name="maLoaiNguoiDung"
                                onChange={handleSelectChange}
                                value={formik.values.maLoaiNguoiDung}
                                id='maLoaiNguoiDung'
                            >
                                {renderSelect()}
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{ display: 'block', margin: '0 auto' }}>
                           Thêm người dùng
                        </Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}
