import { SET_DANH_SACH_PHIM, SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../types/QuanLyPhimType"
import { SET_CHI_TIET_PHIM } from "../types/QuanLyRapType";


const stateDefaults = {
    arrFilm: [
        {
            "maPhim": 10908,
            "tenPhim": "Smile - Cười lên",
            "biDanh": "smile-cuoi-len",
            "trailer": "https://www.youtube.com/embed/vAR8Jii3T1E",
            "hinhAnh": "http://movieapi.cyberlearn.vn/hinhanh/smile-cuoi-len_gp00.jpg",
            "moTa": "Sau khi chứng kiến ​​một sự việc kỳ lạ, đau thương liên quan đến một bệnh nhân. Tiến sĩ Rose Cotter bắt đầu trải qua những điều đáng sợ xảy ra mà cô ấy không thể giải thích. Khi một nỗi kinh hoàng bao trùm bắt đầu chiếm lấy cuộc sống của cô, Rose phải đối mặt với quá khứ rắc rối của mình để tồn tại và thoát khỏi thực tại mới kinh hoàng của mình.",
            "maNhom": "GP00",
            "ngayKhoiChieu": "2024-03-19T21:54:30.133",
            "danhGia": 3,
            "hot": false,
            "dangChieu": false,
            "sapChieu": true
        }
    ],
    dangChieu: true,
    sapChieu: true,
    arrFilmDefault: [],
    filmDetail: {},
    thongTinPhim: {},
}
export const QuanLyPhimReducer = (state = stateDefaults, action) => {

    switch (action.type) {
        case SET_DANH_SACH_PHIM: {
            state.arrFilm = action.arrFilm;
            state.arrFilmDefault = state.arrFilm
            return { ...state }
        }
        case SET_PHIM_DANG_CHIEU: {
            state.dangChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.dangChieu === state.dangChieu);
            return { ...state }
        }
        case SET_PHIM_SAP_CHIEU: {
            state.sapChieu = !state.dangChieu;
            state.arrFilm = state.arrFilmDefault.filter(film => film.sapChieu === state.sapChieu);
            return { ...state };
        }
        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.filmDetail;
            return { ...state }
        }
        case 'SET_THONG_TIN_PHIM': {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state }
        }
        case 'SET_UPDATE_PHIM': {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state }
        }
        default:
            return { ...state }
    }
}