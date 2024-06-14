/* eslint-disable react/jsx-pascal-case */
import React from "react";
import Slider from "react-slick";
import styleSlick from './RsSLick.module.css'
// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch } from 'react-redux';
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from "../../redux/types/QuanLyPhimType";
import { useSelector } from 'react-redux';


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-prev']}`}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} ${styleSlick['slick-next']}`}
            style={{ ...style, display: "block", left: '-50px' }}
            onClick={onClick}
        />
    );
}



function MultipleRows(props) {
    const dispatch = useDispatch();
    const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

    const handleDangChieuClick = () => {
        dispatch({ type: SET_PHIM_DANG_CHIEU });
    };

    const handleSapChieuClick = () => {
        dispatch({ type: SET_PHIM_SAP_CHIEU });
    };

    const activeClassDC = dangChieu ? 'active_Film' : 'none_active_Film';
    const activeClassSC = sapChieu ? 'active_Film' : 'none_active_Film';
    console.log('activeSC', activeClassSC)


    const { arrFilms } = props

    const settings = {
        className: "center variable-width",
        centerMode: true,
        infinite: true,
        // centerPadding: "20px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />

    };
    const renderFlims = () => {

        return arrFilms.slice(0, 12).map((item, index) => {
            return <div className={`${styleSlick['width-item']}`} key={index} >
                {/* <Film phim={item} /> */} <Film_Flip item={item} />
            </div>
        })
    }
    return (
        <div className="container">
            <button
                type="button"
                className={`px-8 py-3 font-semibold border rounded mr-2 ${activeClassDC} bg-gray-800 text-white`}
                onClick={handleDangChieuClick}
            >
                Phim Đang Chiếu
            </button>
            <button
                type="button"
                className={`px-8 py-3 font-semibold border rounded ${activeClassSC} bg-white text-gray-800 border-gray-800 border`}
                onClick={handleSapChieuClick}
            >
                Phim Sắp Chiếu
            </button>

            <Slider {...settings}>
                {renderFlims()}
            </Slider>
        </div>
    );
}

export default MultipleRows;