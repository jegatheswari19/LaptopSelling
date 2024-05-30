import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css'; // Ensure this path is correct
import Navbars from './Navbars';
import Footer from './Footer'
import Home from './Home';
import Login from './Login';
import Signin from './Signin.jsx';// Ensure the path to your Navbars component is correct

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
          
           
          </Routes>
          <Footer/>
        </header>
      </div>
    </Router>
  );
}

export default App;

