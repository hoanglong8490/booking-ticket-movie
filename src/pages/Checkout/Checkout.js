/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './Checkout.css';
import { NavLink, useParams } from 'react-router-dom';
import { CloseOutlined, UserOutlined, CheckOutlined } from '@ant-design/icons'
import { Tabs} from 'antd';
import _ from 'lodash'
import moment from 'moment';

import User from '../../component/User/User';


function Checkout(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const { chiTietPhongVe, danhSachGheDangDat, thongTinDatVe, danhSachGheKhachDat } = useSelector(state => state.QuanLyDatVeReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'GET_THONG_TIN_DAT_VE',
            maLichChieu: id
        })
        // connection.invoke('loadDanhSachGhe', id)

        // //Load danh sach ghe dang dat tu server ve
        // connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
        //     console.log('DanhSachGheDat', dsGheKhachDat);
        //     //b1:loai minh ra khoi danh sach dat
        //     dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
        //     //b2: gop danh sach ghe khach dat o tat ca user thanh 1 mang chung
        //     let arrGheKhachDat = dsGheKhachDat.reduce((res, item, index) => {
        //         let arrGhe = JSON.parse(item.danhSachGhe);
        //         return [...res, ...arrGhe]
        //     }, []);
        //     //Dua du lieu ghe khach dat cap nhat redux
        //     arrGheKhachDat = _.uniqBy(arrGheKhachDat, 'maGhe');
        //     //dua du lieu ghe khach dat ve redux
        //     dispatch({
        //         type: 'DAT_GHE',
        //         arrGheKhachDat
        //     })
        // })
        // //cai dat su kien khi reload trnag
        // window.addEventListener("beforeunload", clearGhe);

        // return () => {
        //     clearGhe();
        //     window.removeEventListener("beforeunload", clearGhe)
        // }

    }, [])

    // const clearGhe = function (event) {
    //     connection.invoke('huyDat', userLogin.taiKhoan, id)
    // }

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;

    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {

            let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';

            //kiem tra tung ghe render xem co trong mang ghe dang dat hay khong
            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe);
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat';
            }


            if (indexGheDD !== -1) {
                classGheDangDat = 'gheDangDat';
            }

            //kiem tra tung ghe render xem co phai ghe khach dat hay khong
            let classGheKhachDat = '';
            let indexGheKD = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === ghe.maGhe);
            if (indexGheKD !== -1) {
                classGheKhachDat = 'gheNguoiKhacDat';
            }


            return <Fragment key={index}>
                <button disabled={ghe.daDat || classGheKhachDat !== ''} className={`ghe ${classGheKhachDat} ${classGheVip}  ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat}`} key={index} onClick={() => {

                    dispatch({
                        type: 'DAT_VE',
                        gheDuocChon: ghe
                    })

                }}>
                    {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined /> : <CloseOutlined style={{ fontWeight: 'bold' }} /> : classGheKhachDat !== '' ? <UserOutlined /> : ghe.stt}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}

            </Fragment>
        })
    }

    return (
        <div className='container min-h-screen ' >
            <div className='grid grid-cols-12 '>
                <div className='col-span-9'>
                    <div className='flex flex-col items-center mt-5'>
                        <div className=' bg-black ' style={{ width: '75%', height: 15 }}>
                        </div>
                        <div className='trapezoid text-center '>
                            <h3 className=' text-black '> screen</h3>
                        </div>
                    </div>
                    <div>
                        {renderSeats()}
                    </div>

                </div>

                <div className='col-span-3'>
                    <h3 className='text-green-400 text-center text-4xl'>Vé xem phim</h3>
                    <hr />
                    <h3 className='text-xl mt-2'>{thongTinPhim?.tenPhim}</h3>
                    <p>Địa Chỉ:{thongTinPhim?.tenCumRap}-{thongTinPhim?.tenRap}</p>
                    <p>Ngày Chiếu:{thongTinPhim?.ngayChieu}-{thongTinPhim?.gioChieu}</p>
                    <hr />
                    <div className='flex flex-row my-5'>
                        <div className='w-4/5'>
                            <span className='text-red-400 text-2xl'>Ghế</span>
                            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
                                return <span key={index} className='text-green-500 text-2xl'> {gheDD.stt}</span>
                            })}
                        </div>
                        <div className='col-span-1 text-right'>
                            <span className='text-green-800 text-2xl ' >
                                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe;
                                }, 0).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Email</i>
                        <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Phone</i>
                        <br />
                        {userLogin.soDienThoai}
                    </div>
                    <hr />
                    <div className='flex flex-col justify-end items-center' style={{ marginBottom: 0 }}>
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold cursor-pointer' onClick={() => {
                            console.log(thongTinDatVe)
                            dispatch({
                                type: 'GET_DAT_VE',
                                payload: {
                                    maLichChieu: id,
                                    danhSachVe: danhSachGheDangDat
                                }
                            });
                        }}>
                            <p>ĐẶT VÉ</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='mt-5 flex justify-between'>
                <table className=' divide-gray-200 w-2/3' style={{ border: 'none' }}>
                    <thead className='bg-gray-50 p-5'>
                        <tr>
                            <th>Ghế chưa đặt</th>
                            <th>Ghế đang đặt</th>
                            <th>Ghế VIP</th>
                            <th>Ghế đã được đặt</th>
                            <th>Ghế mình đặt</th>
                            <th>Ghế người khác đặt</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-gray-200'>
                        <tr>
                            <td>
                                <button className='ghe text-center'><CheckOutlined /></button>
                            </td>
                            <td>
                                <button className='ghe gheDangDat text-center'><CheckOutlined /></button>
                            </td>
                            <td>
                                <button className='ghe gheVip text-center'><CheckOutlined /></button>
                            </td>
                            <td>
                                <button className='ghe gheDaDat text-center'><CheckOutlined /></button>
                            </td>
                            <td>
                                <button className='ghe gheDaDuocDat text-center'><CheckOutlined /></button>
                            </td>
                            <td>
                                <button className='ghe  gheNguoiKhacDat text-center'><CheckOutlined /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}


const { TabPane } = Tabs;

export default function Demo(props) {


    return <div className='p-5'>
        <Tabs tabBarExtraContent={<User/>} defaultActiveKey='1'>
            <TabPane tab="Chọn ghế thanh toán" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="Kết quả đặt vé" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<NavLink to='/home'>Trang Chủ</NavLink>} key="3">

            </TabPane>
        </Tabs>
    </div>
};

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
            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
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
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lịch Sử Đặt Vé</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy kiểm tra lại vé của bạn và thông tin của vé</p>
                </div>
                <div className='flex flex-wrap -m-2'>
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}