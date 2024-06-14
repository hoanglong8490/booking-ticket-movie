import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { GET_CAROUSEL } from '../../../../redux/constants/CarouselConstants';


export default function HomeCarousel(props) {
    const dispatch = useDispatch();
    const { arrImg } = useSelector(state => state.CarouselReducer);


    const contentStyle = {
        height: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
    };

    useEffect(() => {

        dispatch({
            type: GET_CAROUSEL
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderImg = () => {
        return arrImg.map((item, index) => {
            return <div key={index}>
                <div style={contentStyle}>
                    <img src={item.hinhAnh} className='w-full h-full' alt='img-carousel' />
                </div>
            </div>
        })
    }

    return (
        <Carousel effect="fade">
            {renderImg()}
        </Carousel>
    )
}
