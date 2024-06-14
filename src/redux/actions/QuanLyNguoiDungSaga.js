
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE } from '../../util/Settings/config';
import { history } from './../../App';






function* quanLyNguoiDung(action) {
    yield put({ type: DISPLAY_LOADING })
    try {
        yield delay(1500);
        const { data, status } = yield call(() => quanLyNguoiDungService.dangNhap(action.thongTinDangNhap));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THONG_TIN_DANG_NHAP',
                thongTinDangNhap: data.content
            })
            history.back();
        }
    } catch (error) {
        console.log('error: ', error)
    }
    yield put({ type: HIDE_LOADING })
}
export function* watchQuanLyNguoiDung() {

    yield takeLatest('GET_THONG_TIN_DANG_NHAP', quanLyNguoiDung)
}

function* layThongTinNguoiDung(action) {
    const { taiKhoan } = action;
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.thongTinNguoiDung(taiKhoan));
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: 'SET_THONG_TIN_NGUOI_DUNG',
                thongTinNguoiDung: data.content
            })
        }
    } catch (error) {
        console.log('error: ', error)
    }
}
export function* watchLayThongTinNguoiDung() {

    yield takeLatest('GET_THONG_TIN_NGUOI_DUNG', layThongTinNguoiDung)
}

function* dangKyNguoiDung(action) {
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.dangKy(action.thongTinDangKy))
        console.log(data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THONG_TIN_DANG_KY',
                thongTinDangKy: data.content
            })
        }
        alert('Đăng ký thành công')
    } catch (error) {
        alert('Đăng ký thất bại.Tài khoản hoặc email đã có người sử dụng?')
    }
}

export function* watchDangKyNguoiDung() {
    yield takeLatest('GET_THONG_TIN_DANG_KY', dangKyNguoiDung)
}

function* capNhatThongTinNguoiDung(action) {
    const { thongTinCapNhat } = action
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinCapNhat))
        console.log('data', data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT',
                thongTinNguoiDung: data.content
            })
        }
        alert('Cập nhật thông tin thành công')
        history.push('/admin/users')
        window.location.reload()
    } catch (error) {
        console.log('error', error.response.data)
    }
}
export function* watchCapNhatThongTinNguoiDung() {
    yield takeLatest('GET_THONG_TIN_NGUOI_DUNG_CAP_NHAT', capNhatThongTinNguoiDung)
}

function* layDanhSachThongTinNguoiDung() {
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.layDanhSachNguoiDung())
        // console.log('data', data)
        if (status === STATUS_CODE.SUCCESS) {

            yield put({
                type: 'SET_DANH_SACH_THONG_TIN_NGUOI_DUNG',
                danhSachThongTinNguoiDung: data.content
            })
        }
    } catch (error) {
        console.log('error', error.response.data);
    }
}
export function* watchLayDanhSachThongTinNguoiDung() {
    yield takeLatest('GET_DANH_SACH_THONG_TIN_NGUOi_DUNG', layDanhSachThongTinNguoiDung)
}

function* layDanhSachLoaiNguoiDung() {
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.layDanhSachLoaiNguoiDung());
        // console.log('data', data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_LOAI_NGUOI_DUNG',
                danhSachLoaiNguoiDung: data.content
            })
        }
    } catch (error) {
        console.log('error', error.response.data);
    }
}
export function* watchLayDanhSachLoaiNguoiDung() {
    yield takeLatest('GET_LOAI_NGUOI_DUNG', layDanhSachLoaiNguoiDung)
}

function* themNguoiDung(action) {
    const { formData } = action
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.themNguoiDung(formData))
        console.log('data', data)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THEM_NGUOI_DUNG',
                themNguoiDungAdmin: data.content
            })
            alert('Đăng ký thành công')
            window.location.reload()
        } else if (status === STATUS_CODE.SERVER_ERRO) {
            console.log('Lỗi dữ liệu', status)
        }
    } catch (error) {
        alert('error :' + error.response.data.content)
    }
}
export function* watchThemNguoiDung() {
    yield takeLatest('GET_THEM_NGUOI_DUNG', themNguoiDung)
}

function* xoaTaiKhoanNguoiDung(action) {
    const { taiKhoan } = action
    try {
        const { data, status } = yield call(() => quanLyNguoiDungService.xoaNguoiDung(taiKhoan));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_XOA_TAI_KHOAN',
                thongTinNguoiDung: data.content
            })
            yield put({
                type: 'GET_DANH_SACH_THONG_TIN_NGUOi_DUNG',
            })
            alert('Xóa tài khoản thành công')
        }
    } catch (error) {
        console.log('error: ' + error.response.data.content)
    }
}
export function* watchXoaTaiKhoanNguoiDung() {
    yield takeLatest('GET_XOA_TAI_KHOAN', xoaTaiKhoanNguoiDung)
}