
import './App.css';
import { createBrowserHistory } from 'history'
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import HomeTemplate from './template/HomeTemplate/HomeTemplate';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import CheckoutTemplate from './template/CheckoutTemplate/CheckoutTemplate';
import Checkout from './pages/Checkout/Checkout';
import UserTemplate from './template/UserTemplate/UserTemplate';
import Profile from './pages/Profile/Profile';
import AdminTemplate from './template/AdminTemplate/AdminTemplate';
// import Dashboard from './pages/Admin/UserTitle/Dashboard';
import Films from './pages/Admin/Films/Films';

// import { Suspense, lazy } from 'react';

// const CheckoutTemplateLazy = lazy(() => import('./template/CheckoutTemplate/CheckoutTemplate'))
import Showtime from './pages/Admin/Showtime.js/Showtime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Edit/Edit';
import UserTitle from './pages/Admin/UserTitle/UserTitle';
import AddUser from './pages/Admin/UserTitle/AddUser/AddUser';
import EditUser from './pages/Admin/UserTitle/EditUser/EditUser';

export const history = createBrowserHistory()


function App() {
  return (
    <>
      <Routes history={history}>
        <Route element={<HomeTemplate />}>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/' element={<Home />}></Route>
        </Route>
        <Route element={<UserTemplate />}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>

        </Route>
        <Route element={<CheckoutTemplate />}>
          <Route path='/Checkout/:id' element={<Checkout />}></Route>
        </Route>
        <Route element={<AdminTemplate />}>
          <Route path='/admin' element={<UserTitle />}></Route>
          <Route path='/admin/users/addusers' element={<AddUser />}></Route>
          <Route path='/admin/users/editusers/:taiKhoan' element={<EditUser />}></Route>
          <Route path='/admin/films' element={<Films />}></Route>
          <Route path='/admin/films/addnew' element={<AddNew />}></Route>
          <Route path='/admin/films/edit/:id' element={<Edit />}></Route>
          <Route path='/admin/films/showtimes/:id/:tenphim' element={<Showtime />}></Route>
          <Route path='/admin/users' element={<UserTitle />}></Route>
        </Route>

        {/* <Route element={<Suspense fallback={<div>Loading...</div>}><CheckoutTemplateLazy /></Suspense>}>
          <Route path='/checkout/:id' element={<Checkout />}></Route>
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
