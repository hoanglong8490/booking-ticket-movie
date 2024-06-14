import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { GROUPID } from '../../../../util/Settings/config';
import { useFormik } from 'formik';
import { Button, Form, Input, Select } from 'antd';

export default function EditUser() {
    const { danhSachLoaiNguoiDung, danhSachThongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    const { taiKhoan } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: 'GET_DANH_SACH_THONG_TIN_NGUOi_DUNG',
        })
        dispatch({
            type: 'GET_LOAI_NGUOI_DUNG',
            danhSachLoaiNguoiDung
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
            const nguoiDungChinhSua = danhSachThongTinNguoiDung.find(nguoiDung => nguoiDung.taiKhoan === taiKhoan);
   


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
        enableReinitialize: true,
        initialValues: {
            hoTen: nguoiDungChinhSua?.hoTen,
            email: nguoiDungChinhSua?.email,
            soDt: nguoiDungChinhSua?.soDt,
            taiKhoan: nguoiDungChinhSua?.taiKhoan,
            matKhau: nguoiDungChinhSua?.matKhau,
            maLoaiNguoiDung: nguoiDungChinhSua?.maLoaiNguoiDung,
            maNhom: GROUPID
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

            if (!values.soDt) {
                errors.soDt = 'Vui lòng nhập số điện thoại';
            } else if (!isValidPhoneNumber(values.soDt)) {
                errors.soDt = 'Số điện thoại không hợp lệ';
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
                dispatch({
                    type:'GET_THONG_TIN_NGUOI_DUNG_CAP_NHAT',
                    thongTinCapNhat: values
                })
            }
            console.log('values', values)   

        }
    },
    );
    // console.log('data',formik.values)
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
        <div className='bg-gray-100 flex justify-center items-center h-screen'>
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/free-vector/video-files-concept-illustration_114360-4758.jpg?t=st=1714030523~exp=1714031123~hmac=6d7ffb8127eee6903acbb28695510bd382e99631d690cd7e2ce973447fab60ae" alt='logo' className="object-cover w-full h-full" />
            </div>

            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="text-2xl font-semibold mb-4">Chỉnh Sửa Người Dùng </h1>
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
                        <Input id='hoTen' name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} />
                    </Form.Item>
                    <Form.Item label="Email " validateStatus={formik.errors.email && 'error'} help={formik.errors.email}  >
                        <Input id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" validateStatus={formik.errors.soDt && 'error'} help={formik.errors.soDt} >
                        <Input id='soDt' name='soDt' onChange={formik.handleChange} value={formik.values.soDt} />
                    </Form.Item>
                    <Form.Item label="Tài khoản " validateStatus={formik.errors.taiKhoan && 'error'} help={formik.errors.taiKhoan} >
                        <Input id='taiKhoan' name='taiKhoan' onChange={formik.handleChange} value={formik.values.taiKhoan} />
                    </Form.Item>
                    <Form.Item label="Mật khẩu " validateStatus={formik.errors.matKhau && 'error'} help={formik.errors.matKhau} >
                        <Input.Password id='matKhau' name='matKhau' onChange={formik.handleChange} value={formik.values.matKhau} />
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
    )
}

