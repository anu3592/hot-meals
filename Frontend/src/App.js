import TopNav from './components/TopNav'
import Featured from './components/Featured';

import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import Items from './components/Items';
import AddResturant from './components/AddResturant';
import Rlogin from './components/Rlogin';
import Resturant from './components/Resturant';
import Orders from './components/Orders';
import FrontPage from './components/FrontPage';
import Cart from './components/Cart';
import PrivateComponent from './components/PrivateComponent';
import { useEffect, useState } from 'react';
import CheckOutPage from './components/CheckOutPage';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentError from './components/PaymentError';
import Payment from './components/Payment';
import Product from './components/Product';
import Dashboard from './components/Dashboard';
import Dash from './components/Dash';
import DashProduct from './components/DashProduct';
import DashCustomer from './components/DashCustomer';
import DashResturant from './components/DashResturant';
import Loading from './components/Loading';

function App() {
  let auth = localStorage.getItem('token');
  let token = localStorage.getItem('tokenR');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth = localStorage.getItem('token');
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  function showNav() {
    auth = localStorage.getItem('token');
    token = localStorage.getItem('tokenR');
  }
  return (
    <div className="App">

      <BrowserRouter>
        {auth ?
          <TopNav></TopNav>
          : <></>
        }
        {
          token ?
          <TopNav></TopNav>
          :<></>
        }
          <Routes>
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<Featured />} />
              <Route path='/addproduct' element={<AddProduct />} />
              <Route path='/item' element={<Items />}></Route>
              <Route path='/resturant' element={<Resturant />} />
              <Route path='/order' element={<Orders />} />
              <Route path='/cart' element={<Cart />}></Route>
              <Route path='/check' element={<CheckOutPage />}></Route>
              <Route path='/pay' element={<Payment />}></Route>
              <Route path='/product' element={<Product />}></Route>
              <Route path='/dashboard/' element={<Dashboard />}>
                <Route path='' element={<Dash />} />
                <Route path='dashProduct' element={<DashProduct />} />
                <Route path='dashCustomer' element={<DashCustomer />}></Route>
                <Route path='dashResturant' element={<DashResturant />}></Route>
              </Route>
            </Route>

            <Route path='/paysuccess' element={<PaymentSuccess />}></Route>
            <Route path='/payerror' element={<PaymentError />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/addresturant' element={<AddResturant />} />
            <Route path='/rlogin' element={<Rlogin />} />
            <Route path='/front' element={<FrontPage />}></Route>
          </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
