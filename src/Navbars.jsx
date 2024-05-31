import './navbar.css'
import pic from './assets/icon.jpg'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbars() {
    const navigate = useNavigate();
    const [log, setLog] = useState('login');

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (loggedIn) {
            setLog('logout');
        }
    });

    const handle = () =>{
         if(log == 'logout'){
            setLog('login');
            sessionStorage.removeItem('loggedIn');
            navigate('/Login');       }
    
       else if (log == 'login'){
            navigate('/Login');
        }
    }
    return (
        <div className='nav'>
            <nav className='nav-bar'>
                <img className='icon' src={pic} alt="icon"></img>
                <ul className='navbar'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/product">Products</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><button  className="log_button"onChange={(e)=>setLog(e.target.value)} onClick={handle}>{log}</button></li>
                </ul>
            </nav>
        </div>
    );
}
