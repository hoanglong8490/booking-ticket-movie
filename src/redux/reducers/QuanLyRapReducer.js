

const stateDefault = {
    heThongRapChieu: []
}

export const QuanLyRapReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'SET_DANH_SACH_CUM_RAP': {
            state.heThongRapChieu = action.heThongRapChieu;
            return { ...state }
        }

        default:
            return { ...state }
    }
}