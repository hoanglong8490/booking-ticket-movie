/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { Input, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const { Search } = Input;

export default function UserTitle() {

  const { danhSachThongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'GET_DANH_SACH_THONG_TIN_NGUOi_DUNG',
      danhSachThongTinNguoiDung
    })
  }, [])
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      sorter: (a, b) => a.stt - b.stt,
      sortDirections: ['descend'],
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
    },
    {
      title: 'Tài khoản ',
      dataIndex: 'taiKhoan',
    },
    {
      title: 'Loại người dùng',
      dataIndex: 'maLoaiNguoiDung',
      filters: [
        {
          text: 'Quản trị',
          value: 'QuanTri',
        },
        {
          text: 'Khách Hàng ',
          value: 'KhachHang',
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      title: 'Hành Động',
      dataIndex: 'stt',
      render: (text, nguoiDung) => {

        return <Fragment>
          <NavLink key={1} className='bg-white text-blue-900 p-2 text-xl' to={`/admin/users/editusers/${nguoiDung.taiKhoan}`}><EditOutlined /></NavLink>
          <span key={2} className='bg-white text-red-900  p-2 text-xl' style={{ cursor: 'pointer' }} onClick={() => {
            if (window.confirm('Bạn có muốn xóa tài khoản này không?' + nguoiDung.taiKhoan)) {
              dispatch({
                type: 'GET_XOA_TAI_KHOAN',
                taiKhoan: nguoiDung.taiKhoan,
              })
              console.log(nguoiDung)
            }
          }}><DeleteOutlined /></span>
        </Fragment>
      }
    },
  ];

  const data = danhSachThongTinNguoiDung;
  const dataWithSTT = data.map((item, index) => ({ ...item, stt: index + 1 }));

  const onSearch = value => {
    console.log(value);
    dispatch({
      type: 'GET_DANH_SACH_THONG_TIN_NGUOi_DUNG',
      taiKhoan: value
    })
  }


  return <div className='container'>
      <h3 className='text-4xl mb-2'>Quản Lý Người Dùng</h3>
      <Search className='mb-3'
      placeholder="input search text"
      enterButton="Tìm kiếm"
      size="large"
      onSearch={onSearch}
    />
      <Table
        columns={columns}
        dataSource={dataWithSTT}
        showSorterTooltip={{
          target: 'sorter-icon',
        }}
        rowKey={'stt'}
      />
  </div>


}
