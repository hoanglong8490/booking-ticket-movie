
import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { CarouselReducer } from './reducers/CarouselReducer';
import { rootSaga } from './actions/rootSaga';
//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import LoadingReducer from './reducers/LoadingReducer';


const middlewareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
})
const store = legacy_createStore(rootReducer, applyMiddleware(thunk, middlewareSaga));

middlewareSaga.run(rootSaga);
export default store;