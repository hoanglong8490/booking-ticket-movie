import { all } from 'redux-saga/effects';
import { watchCarousel } from './CarouselSaga';
import { watchDanhSachFilm, watchDeletePhim, watchThemPhimUpLoadHinh, watchThongTinPhim, watchUpdatePhim } from './QuanLiFilmSaga';
import { watchDanhSachCumRap, watchThongTinChiTietPhim } from './QuanLyRapSaga';
import { watchCapNhatThongTinNguoiDung, watchDangKyNguoiDung, watchLayDanhSachLoaiNguoiDung, watchLayDanhSachThongTinNguoiDung, watchLayThongTinNguoiDung, watchQuanLyNguoiDung, watchThemNguoiDung, watchXoaTaiKhoanNguoiDung } from './QuanLyNguoiDungSaga';
import { watchDatVe, watchQuanLyDatVe } from './QuanLyDatVeSaga';



export function* rootSaga() {
    yield all([
        watchCarousel(),
        watchDanhSachFilm(),
        watchDanhSachCumRap(),
        watchThongTinChiTietPhim(),
        watchQuanLyNguoiDung(),
        watchQuanLyDatVe(),
        watchDatVe(),
        watchLayThongTinNguoiDung(),
        watchThemPhimUpLoadHinh(),
        watchThongTinPhim(),
        watchUpdatePhim(),
        watchDeletePhim(),
        watchDangKyNguoiDung(),
        watchCapNhatThongTinNguoiDung(),
        watchLayDanhSachThongTinNguoiDung(),
        watchLayDanhSachLoaiNguoiDung(),
        watchThemNguoiDung(),
        watchXoaTaiKhoanNguoiDung(),
    ])
}