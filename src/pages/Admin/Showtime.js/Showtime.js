/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form, DatePicker, Select, InputNumber } from 'antd';
import { quanLyRapPhimServer } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';




export default function Showtime(props) {
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    })
    const { id, tenphim } = useParams();
    const formik = useFormik({
        initialValues: {
            maPhim: id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
        },
        onSubmit: async (values) => {
            console.log(values);
            try {
                const res = await quanLyDatVeService.taoLichChieu(values);
                alert(res.data.content);
            } catch (error) {
                console.log('error', error.response?.data);
            }
        },
    })


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await quanLyRapPhimServer.layThongTinRap();
                // console.log(res);
                setState({
                    ...state,
                    heThongRapChieu: res.data.content
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, []);

    // state.heThongRapChieu?.map((htr, index) => ({
    //     label: htr.tenHeThongRap, value: htr.tenHeThongRap
    // }
    // ))

    const converSelectHTR = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return {
                label: htr.tenHeThongRap,
                value: htr.maHeThongRap,
                key: index
            }
        })
    }

    const handleChangHeThongRap = async (value) => {
        //tu he thong rap call api lay thong tin rap
        try {
            let res = await quanLyRapPhimServer.layThongTinCumRap(value);
            setState({
                ...state,
                cumRapChieu: res.data.content
            })
        } catch (error) {
            console.log('error', error)
        }
    }
    const handleChangCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }

    const converSelectCumRap = () => {
        return state.cumRapChieu?.map((cumRap, index) => {
            return {
                label: cumRap.tenCumRap,
                value: cumRap.maCumRap,
                key: index
            }
        })
    }

    const onOK = (values) => {
        console.log('value', moment(values).format('DD/MM/YYY hh:mm:ss'));
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }

    const onChangeDate = (values) => {
        console.log('value', moment(values).format('DD/MM/YYYY hh:mm:ss'));
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    };

    const onChangInputNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    };
    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }

    return (
        <div className='container'>

            <Form name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}
                autoComplete="off"
            >
                <h3 className='text-2xl mb-5'>Tạo lịch chiếu - {tenphim} </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '20px' }}>
                    <img src={film.hinhAnh} alt='' width={300} height={200} />
                    <div>
                        <Form.Item label='Hệ thống rạp'>
                            <Select options={converSelectHTR()} onChange={handleChangHeThongRap} placeholder='Chọn hệ thống rạp' />
                        </Form.Item>
                        <Form.Item label='Hệ cụm rạp'>
                            <Select options={converSelectCumRap()} onChange={handleChangCumRap} placeholder='Chọn cụm rạp' />
                        </Form.Item>
                        <Form.Item label='Ngày giờ chiếu'>
                            <DatePicker format="DD/MM/YYYY hh:mm:ss" onChange={onChangeDate} showTime needConfirm={true} onOk={onOK} />
                        </Form.Item>
                        <Form.Item label='Giá vé'>
                            <InputNumber onChange={onChangInputNumber} />
                        </Form.Item>
                        <Form.Item label='Chức năng' >
                            <Button htmlType='submit'>Tạo lịch chiếu</Button>
                        </Form.Item>
                    </div>
                </div>

            </Form>
        </div>
    )
}
