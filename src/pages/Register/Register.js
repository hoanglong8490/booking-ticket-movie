import { useFormik } from 'formik'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { GROUPID } from '../../util/Settings/config'
import { useDispatch } from 'react-redux'

export default function Register() {

  const dispatch = useDispatch();
  // const { thongTinDangKy } = useSelector(state => state.QuanLyNguoiDungReducer)
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      hoTen: '',
      soDt: '',
      email: '',
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log('values', values);
      dispatch({
        type: 'GET_THONG_TIN_DANG_KY',
        thongTinDangKy: values
      })
    }
  })


  return (
    <div className="lg:p-10 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Đăng ký</h1>
      <form action="#" onSubmit={formik.handleSubmit}  >
        <div className="">
          <label htmlFor="username" className="block text-gray-600">Tài khoản</label>
          <input onChange={formik.handleChange} type="text" id="taiKhoan" name="taiKhoan" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="">
          <label htmlFor="password" className="block text-gray-600">Mật khẩu </label>
          <input onChange={formik.handleChange} type="password" id="matKhau" name="matKhau" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="">
          <label htmlFor="password" className="block text-gray-600">Họ tên </label>
          <input onChange={formik.handleChange} type="text" id="hoTen" name="hoTen" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="">
          <label htmlFor="password" className="block text-gray-600">Email </label>
          <input onChange={formik.handleChange} type="email" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="">
          <label htmlFor="password" className="block text-gray-600">Số điện thoại </label>
          <input onChange={formik.handleChange} type="tel" id="soDt" name="soDt" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
          <label htmlFor="remember" className="text-gray-600 ml-2">Ghi nhớ mật khẩu</label>
        </div>
        <div className=" text-blue-500">
          <a href="/asd" className="hover:underline">Quên mật khẩu ?</a>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Đăng ký</button>
      </form>
      <div className=" text-blue-500 text-center">
        <NavLink to='/login' className="hover:underline">Đăng nhập </NavLink>
      </div>
    </div>
  )
}
