/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Modal, Tabs } from 'antd'
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../util/Settings/config';
import moment from 'moment';
import _ from 'lodash'

function TitleUser() {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type:'GET_THONG_TIN_NGUOI_DUNG',
            
        })
    }, [])
    console.log('thongTinNguoiDung', thongTinNguoiDung)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maNhom: GROUPID,
            hoTen: thongTinNguoiDung.hoTen,
            taiKhoan: thongTinNguoiDung.taiKhoan,
            email: thongTinNguoiDung.email,
            soDT: thongTinNguoiDung.soDT,
            matKhau: thongTinNguoiDung.matKhau,
            maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,

        },
        onSubmit: (value) => {
            let formData = new FormData();
            for (let key in value) {
                formData.append(key, value[key]);
            }
            console.log(value);
            dispatch({
                type: 'GET_THONG_TIN_NGUOI_DUNG_CAP_NHAT',
                formData: value
            })
        }
    })

    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}

                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}

            >
                <Form.Item label="Họ tên">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                </Form.Item>
                <Form.Item label="Tài khoản">
                    <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
                </Form.Item>
                <Form.Item label="Email" >
                    <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDT} />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button className='bg-blue-500 text-white p-2' type='submit'>Lưu thay đổi</button>
                </Form.Item>
            </Form>
        </>
    )
}
function KetQuaDatVe(props) {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    // const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    console.log('thongTinNguoiDung', thongTinNguoiDung)

    useEffect(() => {
        dispatch({
            type: 'GET_THONG_TIN_NGUOI_DUNG',
            thongTinNguoiDung
        })
    }, [])

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe)
            return <div key={index} className="p-1 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">Giờ chiếu: {moment(ticket.ngayDat).format('hh:mm A ')} - Ngày chiếu:{moment(ticket.ngayChieu).format('DD/MM/YYYY')}</p>
                        <p>Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}</p>
                        <p>Tên rạp:{seats.tenCumRap} - Ghế:{ticket.danhSachGhe.slice(0, 4)?.map((ghe, index) => { return <span className='font-bold' key={index}> [{ghe.tenGhe}] </span> })}</p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className='p-5'>
        <section className="text-gray-600 body-font">
            <div className="container px-5  mx-auto">
                {/* <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy kiểm tra lại vé của bạn và thông tin của vé</p>
                </div> */}
                <div className='flex flex-wrap -m-2'>
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}

export default function ModalProfile({ visible, onClose, props }) {

    const items = [
        {
            key: '1',
            label: 'Thông tin tài khoản',
            children: <TitleUser />,
        },
        {
            key: '2',
            label: 'Lịch sử đặt vé',
            children: <KetQuaDatVe />,
        },

    ];
    return (
        <>
            <Modal
                centered
                open={visible}
                onOk={onClose}
                onCancel={onClose}
                width={1000}
            >
                <Tabs defaultActiveKey="1">
                    {items.map(item => (
                        <Tabs.TabPane key={item.key} tab={item.label}>
                            {item.children}
                        </Tabs.TabPane>
                    ))}
                </Tabs>
            </Modal>
        </>

    )
}