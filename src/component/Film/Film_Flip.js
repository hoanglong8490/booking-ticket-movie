import React from 'react'
import './Film_Flip.css'
import { PlayCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


export default function Film_Flip(props) {

    const { item } = props
    return (
        <div>
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: 400, height: 400 }} />
                    </div>
                    <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0 }}>
                            <img src={item.hinhAnh} alt='avart' style={{ width: 400, height: 400 }} />
                        </div>
                        <div className='w-full h-full' style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div>
                                <div className='rounded-full cursor-pointer'><PlayCircleOutlined style={{ fontSize: '25px' }} /></div>
                                <div className='text-2xl mt-2 font-bold'>{item.tenPhim}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-orange-300 text-center cursor-pointer py-2 my-2 text-success-50 font-bold'>
                <Link to={`/detail/${item.maPhim}`} className='bg-orange-300 text-center cursor-pointer py-2 my-2 text-success-50 font-bold'>Đặt vé</Link>
            </div>

        </div>

    )
}
