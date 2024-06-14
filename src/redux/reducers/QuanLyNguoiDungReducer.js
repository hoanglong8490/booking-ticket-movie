import { TOKEN, USER_LOGIN } from "../../util/Settings/config";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefaults = {
    userLogin: user,
    thongTinNguoiDung: {},
    thongTinDangKy: {},
    danhSachThongTinNguoiDung: [],
    danhSachLoaiNguoiDung: {},
    nguoiDungChinhSua: {},
}
export const QuanLyNguoiDungReducer = (state = stateDefaults, action) => {
    switch (action.type) {
        case 'SET_THONG_TIN_DANG_NHAP': {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }
        case 'SET_THONG_TIN_NGUOI_DUNG': {
            state.thongTinNguoiDung = action.thongTinNguoiDung;

            return { ...state }
        }
        case 'SET_THONG_TIN_DANG_KY': {
            state.thongTinDangKy = action.thongTinDangKy;
            return { ...state }
        }
        case 'SET_DANH_SACH_THONG_TIN_NGUOI_DUNG': {
            state.danhSachThongTinNguoiDung = action.danhSachThongTinNguoiDung;
            return { ...state }
        }
        case 'SET_LOAI_NGUOI_DUNG': {
            state.danhSachLoaiNguoiDung = action.danhSachLoaiNguoiDung;
            return { ...state };
        }
        case 'SET_THONG_TIN_NGUOI_DUNG_CAP_NHAT': {
            state.nguoiDungChinhSua = action.nguoiDungChinhSua;
            return { ...state };
        }
        default:
            return { ...state }
    }
}