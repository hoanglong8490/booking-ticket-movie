/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux';
// import Film from '../../component/Film/Film';
import RsSlick from '../../component/RsSlick/RsSlick';
import HomeCarousel from '../../template/HomeTemplate/Layout/HomeCarousel/HomeCarousel';

function Home() {

    const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)


    const dispatch = useDispatch();

    // const renderFlims = () => {
    //     return arrFilm.map((phim, index) => {
    //         return <Film key={index} >

    //         </Film>
    //     })
    // }
    useEffect(() => {
        dispatch({
            type: 'LAY_DANH_SACH_PHIM'
        });
        dispatch({
            type: 'LAY_DANH_SACH_CUM_RAP'
        })
    }, [])

    return (
        <div>
            <HomeCarousel />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <RsSlick arrFilms={arrFilm} ></RsSlick>

                    </div>
                </div>
            </section>
            <div className='mx-36'>
                <HomeMenu heThongRapChieu={heThongRapChieu} />
            </div>
        </div>
    )
}
export default memo(Home)