
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { quanLyRapPhimServer } from '../../services/QuanLyRapService';
import { DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE } from '../../util/Settings/config';
import { SET_CHI_TIET_PHIM } from '../types/QuanLyRapType';



function* getDanhSachCumRap() {
    yield put({ type: DISPLAY_LOADING });
    try {
        yield delay(3000);
        const { data, status } = yield call(() => quanLyRapPhimServer.layDanhSachRap());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'SET_DANH_SACH_CUM_RAP',
                heThongRapChieu: data.content

            })
            // console.log('data',data)
        }
    } catch (error) {
        console.log(error);
    }
    yield put({ type: HIDE_LOADING })
}
export function* watchDanhSachCumRap() {
    yield takeLatest('LAY_DANH_SACH_CUM_RAP', getDanhSachCumRap);
}

function* getThongTinChiTietPhim(action) {
    yield put({ type: DISPLAY_LOADING });
    try {
        yield delay(3000);
        const { data, status } = yield call(() => quanLyRapPhimServer.layThongTinLichChieuPhim(action.id));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_CHI_TIET_PHIM,
                filmDetail: data.content,
            })
        }
    } catch (error) {
        console.log('error', error.respone?.data);
    }
    yield put({ type: HIDE_LOADING })
}
export function* watchThongTinChiTietPhim() {
    yield takeLatest('LAY_THONG_TIN_CHI_TIET_PHIM', getThongTinChiTietPhim)
}
