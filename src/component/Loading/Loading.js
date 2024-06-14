import React from 'react'
import { useSelector } from 'react-redux';
import loading from '../../assets/img/loading.gif';
import './Loading.css'
export default function Loading() {

    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className='bgLoading'>
                <img src={loading} alt=''></img>
            </div>
        )
    }else{
        return ''
    }

}
