/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import '../../assets/style/circle.scss'
import { Tabs, Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

const { TabPane } = Tabs;


export default function Detail(props) {
    const [tabPosition] = useState('left');
    const { id } = useParams();

    const filmDetail = useSelector(state => state.QuanLyPhimReducer.filmDetail);
    const dispatch = useDispatch();
    console.log(filmDetail)

    useEffect(() => {

        dispatch({
            type: 'LAY_THONG_TIN_CHI_TIET_PHIM',
            id: id
        })
    }, [])

    return (
        <div
            style={{
                backgroundImage: `url('https://ggmeo.com/images/linh-thu-dtcl/gwen-tu-chi-duong-khi-ti-ni.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '10px',
                    paddingTop: '10rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    WebkitBackdropFilter: 'blur(4px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    width: '100vw',
                    height: '100vh',
                    textAlign: 'center'
                }}
            >
                {/* Content goes here */}
                <div className='grid grid-cols-12'>
                    <div className='col-span-4 col-start-2'>
                        <div className='grid grid-cols-2'>
                            <img src={filmDetail.hinhAnh} alt='123' />
                            <div className=' ' style={{ padding: '20px' }}>
                                <p className='text-sm'>Ngày Chiếu:{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                                <p className='text-3xl '>{filmDetail.tenPhim}123</p>
                                <p>{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-1 mt-10'>
                        <div>
                            <Rate allowHalf value={filmDetail.danhGia / 2.25} />
                        </div>
                        <div className="pacss-wrapper">

                            <span className="pacss-foreground">

                                <span className="pacss-number" style={{ color: 'black' }}>{filmDetail.danhGia}</span>
                            </span>
                            <span className="pacss pacss-90 pacss-big" />
                        </div>
                    </div>

                    <div className='col-span-5 ml-32'>
                        <Tabs defaultActiveKey="1" centered>
                            <TabPane tab="Lịch chiếu" key="1">
                                <div className=''>
                                    <Tabs tabPosition={tabPosition}>
                                        {filmDetail.heThongRapChieu?.map((htr, index) => {
                                            return <TabPane tab={<div><img src={htr.logo} alt={htr.logo} width={50} height={50}></img>{htr.tenHeThongRap}</div>} key={index}>
                                                {htr.cumRapChieu?.map((cumRap, index) => {
                                                    return <div key={index}>
                                                        <div className='flex flex-row'>
                                                            <img style={{ width: '50px', height: '50px' }} src={htr.logo} alt=''></img>
                                                            <div>
                                                                <p className='ml-2 text-2xl font-medium'>  {cumRap.tenCumRap}</p>
                                                                <p className='ml-2'>   {cumRap.diaChi}</p>
                                                            </div>
                                                        </div>
                                                        <div className='thong-tin-lich-chieu grid grid-cols-4'>
                                                            {cumRap.lichChieuPhim?.map((lichChieu, index) => {
                                                                return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='col-span-1 text-black-500 font-bold mt-2'>
                                                                    {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                                </NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}
                                            </TabPane>
                                        })}
                                    </Tabs>
                                </div>
                            </TabPane>
                            <TabPane tab="Thông tin" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Đánh giá" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div>


                </div>

            </div>
        </div>
    );
}
