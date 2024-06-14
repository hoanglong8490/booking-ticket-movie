/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect } from 'react'
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


const { Search } = Input;


export default function Films() {


  const { arrFilmDefault } = useSelector(state => state.QuanLyPhimReducer);
  console.log('arrFilmDefault', arrFilmDefault)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'LAY_DANH_SACH_PHIM'
    })
  }, []);

  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      width: 150,
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      width: 150,
      render: (text, film, index) => {
        return <Fragment>
          <img style={{ width: '80px', height: '80px' }} src={film.hinhAnh} alt={text} onError={(e) => {
            e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50`;
          }} />
        </Fragment>
      },
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      width: 250,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      render: text => text && text.length > 100 ? `${text.substring(0, 100)}...` : text,
    },
    {
      title: 'Hành Động',
      dataIndex: 'maPhim',
      width: 200,
      render: (text, film) => {
        return <Fragment>
          <div>
            <NavLink key={1} className='bg-white text-blue-900 p-2 text-xl' to={`/admin/films/edit/${film.maPhim}`}><EditOutlined /></NavLink>
            <span key={2} className='bg-white text-red-900  p-2 text-xl' style={{ cursor: 'pointer' }} onClick={() => {
              if (window.confirm('Bạn có muốn xóa phim?' + film.tenPhim)) {
                dispatch({
                  type: 'GET_DELETE_PHIM',
                  maPhim: film.maPhim

                })
              }
            }}><DeleteOutlined /></span>
            <NavLink key={3} className='bg-white text-green-800 p-2 text-xl' to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`} onClick={() => { localStorage.setItem('filmParams', JSON.stringify(film)) }}><CalendarOutlined /></NavLink>
          </div>
        </Fragment>
      },

    },
  ];

  const data = arrFilmDefault;

  const onSearch = value => {
    console.log(value);
    dispatch({
      type: 'LAY_DANH_SACH_PHIM',
      tenPhim: value
    })
  }

  return <div className='container'>
    <h3 className='text-4xl mb-2'>Quản Lý Phim</h3>
    <Search className='mb-3'
      placeholder="input search text"
      enterButton="Tìm kiếm"
      size="large"
      onSearch={onSearch}
    />

    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10, // Số lượng phần tử trên mỗi trang
        // current: 2, // Trang hiện tại
        total: data.length, // Tổng số phần tử trong dữ liệu
        // showSizeChanger: true, // Hiển thị chọn kích thước trang
      }}
      showSorterTooltip={{
        target: 'sorter-icon',
      }}
      rowKey={'maPhim'}
    />
  </div>


}
