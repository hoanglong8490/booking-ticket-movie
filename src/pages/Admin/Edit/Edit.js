/* eslint-disable react-hooks/exhaustive-deps */
import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';

import React, { useEffect, useState } from 'react'
import { GROUPID } from '../../../util/Settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';


export default function Edit() {
    const [componentSize, setComponentSize] = useState('default');
    const { id } = useParams();
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'LAY_THONG_TIN_PHIM',
            id
        })
    }, []);



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
            dangChieu: thongTinPhim.dangChieu,
            sapChieu: thongTinPhim.sapChieu,
            hot: thongTinPhim.hot,
            danhGia: thongTinPhim.danhGia,
            hinhAnh: thongTinPhim.hinhAnh,
            maNhom: GROUPID

        },
        onSubmit: (values) => {
            console.log('value', values);
            values.maNhom = GROUPID;
            //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh);

                    }
                }
            }
            // console.log('form:', formData.get('File'))
            //goi api gui cac gia tri tu form data len be
            dispatch({
                type: 'GET_UPDATE_PHIM',
                formData
            })

        },
    })
    const handleChangDatePicker = (value,string) => {
        console.log('Giá trị mới từ DatePicker:', value)
        let ngayKhoiChieu = dayjs(value,string);
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }


    const handleChangSwitch = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeInputNumber = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    const handleChangeFile = async (e) => {
        //Lấy file ra từ e
        let file = e.target.files[0];
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {
            //Đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file);
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                setImgSrc(e.target.result);//Hình base 64
            }

        }
    }


    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return <div className='container  left-16' style={{ position: 'relative' }}>
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            style={{
                maxWidth: 600,
            }}

        >
            <h3 className='text-4xl mb-4'>Chỉnh sửa phim</h3>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
            </Form.Item>
            <Form.Item label=" Khởi chiếu:">
                <DatePicker format='DD/MM/YYYY' onChange={handleChangDatePicker} value={dayjs(formik.values.ngayKhoiChieu)} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangSwitch('dangChieu')} checked={formik.values.dangChieu} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangSwitch('sapChieu')} checked={formik.values.sapChieu} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangSwitch('hot')} value={formik.values.hot} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={5} value={formik.values.danhGia} />
            </Form.Item>
            <Form.Item label="Hình ảnh" >
                <input type='file' onChange={handleChangeFile} accept="image/png, image/jpeg,image/gif,image/png" />
                <br />
                <img width={150} height={150} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} alt='' value={formik.values.hinhAnh}></img>
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button className='bg-blue-500 text-white p-2' type='submit'>Lưu thay đổi</button>
            </Form.Item>
        </Form>

    </div>
}
