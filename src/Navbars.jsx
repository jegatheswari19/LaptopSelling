import './navbar.css';
import pic from './assets/icon.jpg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbars() {
    const navigate = useNavigate();
    const [log, setLog] = useState('Login');

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (loggedIn) {
            setLog('Logout');
        }
    }); 
    const handle = () => {
        if (log === 'Logout') {
            setLog('Login');
            sessionStorage.removeItem('loggedIn');
            navigate('/Login');
        } else if (log === 'Login') {
            navigate('/Login');
        }
    };

    function showSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'flex';
    }

    function hideSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = 'none';
    }

    return (
        <div className='nav'>
            <nav>
                {/* <img src={pic}></img> */}
                <ul className="sidebar"> 
                    <li onClick={hideSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26">
                        <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                    </svg></a></li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/Product">Products</a></li>
                    <li><a href="/Cart">Cart</a></li>
                    <li><button className='but' onClick={handle} onChange={(e) => setLog(e.target.value)}>{log}</button></li>
                </ul>
                <ul>
                    <li><a href="#">Laptop Shop</a></li>
                    <li className="hideOnMobile"><a href="/">Home</a></li>
                    <li className="hideOnMobile"><a href="/Product">Products</a></li>
                    <li className="hideOnMobile"><a href="/Cart">Cart</a></li>
                    <li className="hideOnMobile"><button className='but' onClick={handle} onChange={(e) => setLog(e.target.value)}>{log}</button></li>
                    <li className="menu-button" onClick={showSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26">
                        <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                    </svg></a></li>
                </ul>
            </nav>
        </div>
    );
}
