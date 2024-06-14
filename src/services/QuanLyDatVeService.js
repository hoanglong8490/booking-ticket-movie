
import { baseService } from './baseService';
export class QuanLyDatVeService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    layChiTietPhongVe = (maLichChieu) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);

    };
    datVe = (thongTinDatVe) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }
    taoLichChieu = (thongTinLichChieu) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
    }
}

export const quanLyDatVeService = new QuanLyDatVeService();