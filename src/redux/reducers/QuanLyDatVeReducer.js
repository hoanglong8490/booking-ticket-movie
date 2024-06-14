
const stateDefaults = {
    chiTietPhongVe: {},
    danhSachGheDangDat: [],
    danhSachGheKhachDat: [],
    // { maGhe: 61963 }, { maGhe: 61964 }
    thongTinDatVe: {
        maLichChieu: 0,
        danhSachVe: []
    },
}

export const QuanLyDatVeReducer = (state = stateDefaults, action) => {
    switch (action.type) {
        case 'SET_THONG_TIN_DAT_VE': {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state };
        }
        case 'DAT_VE': {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.gheDuocChon.maGhe);
            if (index !== -1) {
                //tim thay ghe duoc chon trong mang co nghia la trc do da click vao r xoa di
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.gheDuocChon)
            }
            console.log(action)
            return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
        }
        case 'SET_DAT_VE': {
            // state.danhSachGheDangDat = action.danhSachGheDangDat;
            return { ...state, thongTinDatVe: action.payload };
        }
        case 'HOAN_TAT_DAT_VE': {
            state.danhSachGheDangDat = [];
            return { ...state }
        }
        // case 'DAT_GHE': {
        //     state.danhSachGheKhachDat = action.arrGheKhachDat
        //     return { ...state }
        // }
        default:
            return { ...state }
    }
}