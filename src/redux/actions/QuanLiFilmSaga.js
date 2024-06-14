import { quanLyPhimServer } from "../../services/QuanLyPhimService";
import { call, takeLatest, put, delay } from 'redux-saga/effects';
import { DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE } from "../../util/Settings/config";
import { SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";
import { history } from './../../App';





function* getDanhSachFilm(action) {
    yield put({ type: DISPLAY_LOADING });
    try {
        yield delay(1000);
        const { data, status } = yield call(() => quanLyPhimServer.layDanhSachPhim(action.tenPhim));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_DANH_SACH_PHIM,
                arrFilm: data.content
            })
        }
    } catch (error) {
        console.log(error);
    }
    yield put({ type: HIDE_LOADING })
}
export function* watchDanhSachFilm() {
    yield takeLatest('LAY_DANH_SACH_PHIM', getDanhSachFilm)
}

function* themPhimUpLoadHinh(action) {


    try {
        const { data, status } = yield call(() => quanLyPhimServer.themPhimUpLoadHinh(action.formData));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_PHIM_UP_LOAD',
                formData: data.content
            })
            alert('Thêm phim thành công !!');
        }
    } catch (error) {
        console.log('error: ', error)
    }
}

export function* watchThemPhimUpLoadHinh() {
    yield takeLatest('LAY_PHIM_UP_LOAD', themPhimUpLoadHinh)
}

function* getThongTinPhim(action) {

    try {
        const { data, status } = yield call(() => quanLyPhimServer.layThongTinPhim(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THONG_TIN_PHIM',
                thongTinPhim: data.content
            })
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* watchThongTinPhim() {
    yield takeLatest('LAY_THONG_TIN_PHIM', getThongTinPhim)
}
function* updatePhim(action) {

    try {
        const { data, status } = yield call(() => quanLyPhimServer.capNhatPhimUpLoad(action.formData));
        if (status === STATUS_CODE.SUCCESS) {
            console.log('data', data);
            yield put({
                type: 'SET_UPDATE_PHIM',
                formData: data.content
            })
            yield put({
                type: 'LAY_THONG_TIN_PHIM'
            })
            history.push('/admin/films')
            window.location.reload()
            alert('Cập nhật phim thành công')
        }
    } catch (error) {
        console.log('error', error)
    }
}
export function* watchUpdatePhim() {
    yield takeLatest('GET_UPDATE_PHIM', updatePhim)
}

function* deletePhim(action) {

    try {
        const { data, status } = yield call(() => quanLyPhimServer.xoaPhim(action.maPhim));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_DELETE_PHIM',
                thongTinPhim: data.content
            })
            yield put({
                type: 'LAY_DANH_SACH_PHIM'
            })
        }
        alert('Xóa phim thành công  ')
    } catch (error) {
        console.log('error', error)
    }
}
export function* watchDeletePhim() {
    yield takeLatest('GET_DELETE_PHIM', deletePhim)
}

// export const xoaPhimAction = (maPhim) => {


//     return async (dispatch) => {
//         try {
//             //Sử dụng tham số thamSo
//             const result = await quanLyPhimServer.xoaPhim(maPhim);
//             console.log('result', result.data.content);
//             alert('Xoá phim thành công !');
//             // Sau khi xoá load lại danh sách phim mới;
//             dispatch({
//                 type: 'LAY_DANH_SACH_PHIM'
//             })



//         } catch (errors) {
//             console.log('errors', errors.response?.data)
//         }
//     }
// }