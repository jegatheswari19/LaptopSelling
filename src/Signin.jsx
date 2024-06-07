import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './sign.css';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(password)) {
            setError('Password must contain at least one letter, one number, and one special character.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users', {
                email,
                password
            });
            console.log('User created:', response.data);
            navigate('/Login');
        } catch (error) {
            console.error('There was an error creating the user:', error);
            setError('There was an error creating the account. Please try again.');
        }
    };

    const handleSign = () => {
        navigate('/Login');
    };

    return (
        <div className="wrapper_sign">
            <div className="s_container">
                <div className="sign_left">
                    <div className="sign_text">
                        <h2>Already have an account?</h2>
                        <button className='btn' onClick={handleSign}>Log in</button>
                    </div>
                </div>
                <div className="sign_right">
                    <h2>Sign Up</h2>
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
                        <p>
                            <input type="submit" value="Sign Up" />
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;
