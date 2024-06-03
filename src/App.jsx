import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; 
import Navbars from './Navbars';
import Footer from './Footer'
import Home from './Home';
import Product from './Product.jsx';
import Login from './Login';
import Signin from './Signin.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Navbars/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/Sigin' element={<Signin/>}/>
            <Route path="/Login" element={<Login />} />
            <Route path='/Product' element={<Product/>}/>
          </Routes>
          <Footer/>
        </header>
      </div>
    </Router>
  );
}

export default App;

