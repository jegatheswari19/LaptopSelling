import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'; 
import Navbars from './Navbars';
import Footer from './Footer';
import Home from './Home';
import Product from './Product';
import Login from './Login';
import Signin from './Signin';
import Cart from './Cart';
import BrandProduct from './BrandProduct';
import Payment from './Payment';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbars />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/products/:brandName" element={<BrandProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Payment" element={<Payment />} />
          </Routes>
          <Footer />
        </header>
      </div>
    </Router>
  );
}

export default App;
