import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; 
import Navbars from './Navbars';
import Footer from './Footer'
import Home from './Home';
import Login from './Login';
import Signin from './Signin.jsx';
import Product from './Product.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Navbars/>
          <Routes>
            <Route path='/Signin' element={<Signin/>}/>
            <Route path="/" element={<Home/>} />
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

