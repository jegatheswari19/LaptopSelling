import { useNavigate ,Link} from "react-router-dom";
import React,{useState} from "react";
import './Login.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login()

{
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

 
    const handleSign= () =>{
        navigate('/Signin');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('')
      setPassword('')
      navigate('/');
      sessionStorage.setItem('loggedIn','true');
    } catch (error) {
      setError(error.message);
    }
  };

  



    return(<div className="wrapper login">
    <div className="container">
       <div className="col-left">
          <div className="login-text">
             <h2>Welcome!</h2>
             <p>Create your account.</p>
             <p>For Free!</p>
             <button className="btn" onClick={handleSign} >Sign Up</button>
          </div>
       </div>
       <div className="col-right">
          <div className="login-form">
             <h2>Login</h2>
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
 </div>);
}

export default  Login;