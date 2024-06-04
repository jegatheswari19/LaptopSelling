import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSign = () => {
        navigate('/Signin');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5001/api/login', {
                email,
                password
            });
            if (response.status === 200) {
                setEmail('');
                setPassword('');
                navigate('/');
                sessionStorage.setItem('loggedIn', 'true');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="wrapper login">
            <div className="container">
                <div className="col-left">
                    <div className="login-text">
                        <h2>Welcome!</h2>
                        <p>Create your account.</p>
                        <p>For Free!</p>
                        <button className="btn" onClick={handleSign}>Sign Up</button>
                    </div>
                </div>
                <div className="col-right">
                    <div className="login-form">
                        <h2>Login</h2>
                        {error && <p className="error">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <p>
                                <label>Username/Email address<span>*</span></label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username or Email" required />
                            </p>
                            <p>
                                <label>Password<span>*</span></label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                            </p>
                            <Link to="/Forgot"><p>Forgot password?</p></Link>
                            <p>
                                <input type="submit" value="Sign in" />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
