
import { GROUPID } from '../util/Settings/config';
import { baseService } from './baseService';
export class QuanLyNguoiDungService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    dangNhap = (thongTinDangNhap) => { //taiKhoan'' ,matKhau:''
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);

    };
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy)
    }
    thongTinNguoiDung = (taiKhoan) => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`,taiKhoan)
    }
    capNhatThongTinNguoiDung = (thongTinCapNhat) => {
        return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinCapNhat)
    }
    layDanhSachNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`)
    }
    themNguoiDung = (formData) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, formData)
    }
    xoaNguoiDung = (taiKhoan) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
