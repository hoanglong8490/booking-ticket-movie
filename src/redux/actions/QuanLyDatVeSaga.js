
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { quanLyDatVeService } from '../../services/QuanLyDatVeService';
import { DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE } from '../../util/Settings/config';
// import { connection } from '../../index';




function* quanLyDatVe(action) {
    try {
        const { data, status } = yield call(() => quanLyDatVeService.layChiTietPhongVe(action.maLichChieu))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_THONG_TIN_DAT_VE',
                chiTietPhongVe: data.content
            })
        }
    } catch (error) {
        console.log('error:', error);
    }
}
export function* watchQuanLyDatVe() {
    yield takeLatest('GET_THONG_TIN_DAT_VE', quanLyDatVe);
}

function* datVe(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    try {

        const { data, status } = yield call(() => quanLyDatVeService.datVe(action.payload));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_DAT_VE',
                payload: data.content
            });
            yield put({
                type: 'GET_THONG_TIN_DAT_VE',
                maLichChieu: action.payload.maLichChieu,
            })

            yield put({
                type: 'HOAN_TAT_DAT_VE'
            });
            yield delay(2000);
        }

    } catch (error) {
        console.log('error: ', error);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* watchDatVe() {
    yield takeLatest('GET_DAT_VE', datVe);
}

// export const datGhe = (ghe, maLichChieu) => {
//     return async (dispatch, getState) => {
//         await dispatch({
//             type: 'DAT_VE',
//             gheDuocChon: ghe
//         });
//         //call api ve backend
//         let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
//         let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
//         console.log('danhSachGheDangDat', danhSachGheDangDat);
//         console.log('taiKhoan', taiKhoan);
//         console.log('maLichChieu', maLichChieu);
//         //bien mang  thanh chuoi 
//         danhSachGheDangDat=JSON.stringify(danhSachGheDangDat);
//         //call api signaLR
//         connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
//     }
// }