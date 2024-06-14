
import React, { Fragment, useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
const { TabPane } = Tabs;


export default function HomeMenu(props) {
  const [tabPosition] = useState('left');
  const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

  // const dispatch = useDispatch();



  const renderHeThongRap = () => {
    return heThongRapChieu?.map((heThongRap, index) => {
      return < TabPane tab={<img src={heThongRap.logo} alt={heThongRap.logo} width='50px'></img>} key={index} >
        <Tabs tabPosition={tabPosition}>
          {heThongRap.lstCumRap?.map((cumRap, indexCumRap) => {
            return <TabPane tab={<div style={{ width: '300px', display: 'flex' }}>
              <img src={heThongRap.logo} alt={heThongRap.logo} width='50px'></img>
              <div className='text-left ml-2'>
                {cumRap.tenCumRap}
                <p>Chi tiết</p>
              </div>
            </div>} key={indexCumRap}>
              {cumRap.danhSachPhim.map((phim, index) => {
                return <Fragment key={index}>
                  <div className='my-5'>
                    <div style={{ display: 'flex' }}>
                      <img style={{ width: 50, height: 50 }} src={phim.hinhAnh} alt={phim.tenPhim}></img>
                      <div className='ml-2'>
                        <h1 className=' text-2xl text-green-700 font-bold'>{phim.tenPhim}</h1>
                        <p>{cumRap.diaChi}</p>
                        <div className='grid grid-cols-2 gap-2'>
                          <p>{phim.lstLichChieuTheoPhim?.slice(0, 4).map((lichChieu, index) => {
                            return <NavLink className=' m-2 text-2xl text-orange-500' to={`/checkout/${lichChieu.maLichChieu}`} key={index}>
                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                            </NavLink>
                          })}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              })}
            </TabPane>
          })}
        </Tabs>
      </TabPane >

    })
  }


  return (
    <>
      <Tabs tabPosition={tabPosition}>
        {renderHeThongRap()}
      </Tabs>

    </>
  )
}
