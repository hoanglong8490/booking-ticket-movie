
import { call, put, takeLatest } from 'redux-saga/effects';
import {STATUS_CODE } from '../../util/Settings/config';
import { SET_CAROUSEL } from '../types/CarouselType';
import { GET_CAROUSEL } from '../constants/CarouselConstants';
import { quanLyPhimServer } from '../../services/QuanLyPhimService';

function* getCarouselData() {
 
    try {
        const { data, status } = yield call(() => quanLyPhimServer.layDanhSachBanner());
       
        // console.log(data);
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: SET_CAROUSEL,
                arrImg: data.content
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export function* watchCarousel() {
    yield takeLatest(GET_CAROUSEL, getCarouselData)
}

