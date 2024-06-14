import React, { useState } from 'react'


import { DatePicker, Form, Input, InputNumber, Switch } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
// import { upLoad } from '../../../../redux/actions/QuanLiFilmSaga';
import { GROUPID } from '../../../../util/Settings/config';
export default function AddNew(props) {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},

        },
        onSubmit: (value) => {
            console.log('value', value);
            value.maNhom = GROUPID;
            //tao doi tuong formData()=>dua gia tri values vao form data
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key]);
                } else {
                    formData.append('File', value.hinhAnh, value.hinhAnh.name)
                }
            }
            console.log('form:', formData.get('File'))
            //goi api gui cac gia tri tu form data len be
            dispatch({
                type: 'LAY_PHIM_UP_LOAD',
                formData
            })

        },
    })
    const handleChangDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
        // console.log('Date Picker', moment(value).format('DD/MM/YYYY'));
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

    const handleChangeFile = (e) => {
        //lay file ra tu e
        let file = e.target.files[0];
        //tao doi tuong de doc file
        let reader = new FileReader();


        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            setImgSrc(reader.result);

            //dem du lieu file luu vao formik
            formik.setFieldValue('hinhAnh', file);
        }
    }


    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return <div className='container  left-14' style={{ position: 'relative' }}>

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
            <h3 className='text-4xl mb-4'>Thêm mới phim</h3>
            <Form.Item label="Tên phim">
                <Input name='tenPhim' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label=" Khởi chiếu:">
                <DatePicker name='ngayKhoiChieu' format={"DD/MM/YYYY"} onChange={handleChangDatePicker} />
            </Form.Item>
            <Form.Item label="Đang chiếu" valuePropName="checked">
                <Switch onChange={handleChangSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="Sắp chiếu" valuePropName="checked">
                <Switch onChange={handleChangSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" valuePropName="checked">
                <Switch onChange={handleChangSwitch('hot')} />
            </Form.Item>
            <Form.Item label="Đánh giá">
                <InputNumber onChange={handleChangeInputNumber('danhGia')} min={1} max={5} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <input type='file' onChange={handleChangeFile} />
                <br />
                <img width={150} height={150} src={imgSrc} alt='' accessKey=''></img>
            </Form.Item>
            <Form.Item label="Tác vụ">
                <button className='bg-blue-500 text-white p-2' type='submit'>Thêm phim</button>
            </Form.Item>
        </Form>

    </div>
}
