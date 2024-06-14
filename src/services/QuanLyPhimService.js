
import { GROUPID } from '../util/Settings/config';
import { baseService } from './baseService';
export class QuanLyPhimServer extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };
    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);

    };
    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim !== '') {
            return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID}`)
    };
    themPhimUpLoadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (id) => {
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    }
    capNhatPhimUpLoad = (formData) => {
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimServer = new QuanLyPhimServer();
