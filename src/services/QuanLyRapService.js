

import { GROUPID } from '../util/Settings/config';
import { baseService } from './baseService';
export class QuanLyRapPhimServer extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    layDanhSachRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`);

    };
    layThongTinLichChieuPhim = (id) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
    };
    layThongTinRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
    }
    layThongTinCumRap = (maHeThong) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThong}`)
    }
}

export const quanLyRapPhimServer = new QuanLyRapPhimServer();