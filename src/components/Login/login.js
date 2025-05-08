import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSignIn = (event) => {
    event.preventDefault();

    const data = { email, password };
    axios.post('http://localhost:5001/api/auth/userlogin', data)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', 'member');
        navigate("/admin-home");
        window.alert("Login Successfully");
      })
      .catch(error => {
        console.error('Error during login:', error);
        window.alert("Invalid Credentials");
      });
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      return window.alert("Please enter your email");
    }

    try {
      const res = await axios.post('http://localhost:5001/api/auth/forgotPassword', {
        email: forgotEmail
      });

      setForgotMessage("Reset link sent! Please check your email.");
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to send reset link. Please try again.");
    }
  };
  

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <div className="sign-in-htm">
            <div className="group">
              <label htmlFor="email" className="label">Email</label>
              <input id="email" type="text" className="input" value={email} onChange={handleEmailChange} />
            </div>
            <div className="group">
              <label htmlFor="password" className="label">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Sign In" onClick={handleSignIn} />
            </div>
            <div className="hr" />
            <div className="foot-lnk">
              <span
                onClick={() => setShowForgotPassword(true)}
                style={{ color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-modal">
          <div className="modal-content">
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="input"
            />
            <button className="button" onClick={handleForgotPassword}>
              Send Reset Link
            </button>
            {forgotMessage && <p style={{ color: 'white' }}>{forgotMessage}</p>}
            <button
              className="button"
              onClick={() => {
                setShowForgotPassword(false);
                setForgotMessage('');
              }}
              style={{ marginTop: '10px', backgroundColor: '#444' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
