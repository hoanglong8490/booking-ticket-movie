import React from 'react'
import { useFormik } from 'formik';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {

  const dispatch = useDispatch();
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)

  console.log(userLogin)
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: values => {


      dispatch({
        type: 'GET_THONG_TIN_DANG_NHAP',
        thongTinDangNhap: values
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps



      console.log('value', values)
    },
  });




  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 className="text-2xl font-semibold mb-4">Đăng nhập</h1>
      <form action="#" onSubmit={formik.handleSubmit} >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">Tài khoản</label>
          <input type="text" id="taiKhoan" name="taiKhoan" onChange={formik.handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Mật khẩu </label>
          <input type="password" id="matKhau" name="matKhau" onChange={formik.handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="on" />
        </div>
        <div className="mb-4 flex items-center">
          <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
          <label htmlFor="remember" className="text-gray-600 ml-2">Ghi nhớ mật khẩu</label>
        </div>
        <div className="mb-6 text-blue-500">
          <a href="///" className="hover:underline">Quên mật khẩu ?</a>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Đăng nhập</button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <NavLink to='/register' className="hover:underline">Đăng kí tài khoản </NavLink>
      </div>
    </div>
  )
}
