import { SET_CAROUSEL } from "../types/CarouselType";



const stateDefaults = {
    arrImg: [
        {
            "maBanner": 1,
            "maPhim": 1282,
            "hinhAnh": "https://media.lottecinemavn.com/Media/WebAdmin/f0c4d329b1a544d1898558562bd6f73c.jpg"
        },
        // {
        //     "maBanner": 2,
        //     "maPhim": 1283,
        //     "hinhAnh": "https://media.lottecinemavn.com/Media/WebAdmin/18d1440da2634f27bac6025b259575ad.jpg"
        // },
        // {
        //     "maBanner": 3,
        //     "maPhim": 1284,
        //     "hinhAnh": "https://media.lottecinemavn.com/Media/WebAdmin/bf503cfa01aa4c658f14e7e0e466fe33.jpg"
        // },
        // {
        //     "maBanner": 4,
        //     "maPhim": 1285,
        //     "hinhAnh": "https://media.lottecinemavn.com/Media/WebAdmin/ad8a6b7932ba455cbd6c5d87b02a71a9.jpg"
        // }
    ]
}
export const CarouselReducer = (state = stateDefaults, action) => {
    switch (action.type) {

        case SET_CAROUSEL: {
            state.arrImg = action.arrImg;
            return { ...state }
        }

        default: return { ...state }
    }
}