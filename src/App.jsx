import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'; 
import Navbars from './Navbars';
import Footer from './Footer'
import Home from './Home';
import Product from './Product.jsx';
import Login from './Login';
import Signin from './Signin.jsx';
import Sidebar from './Sidebar.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Navbars/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/Product' element={<Product/>}/>
            <Route path="/products/:brand" element={<Product />} />
            <Route path="/Login" element={<Login />} />
            <Route path='/Signin' element={<Signin/>}/>
            <Route path='/Sidebar' element={<Sidebar/>}/>
           
          </Routes>
          <Footer/>
        </header>
      </div>
    </Router>
  );
}

export default App;

