import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState('signin'); // 'signin' or 'forgot'
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    const data = { email, password };

    axios.post('http://localhost:5001/api/auth/adminlogin', data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', 'admin'); 
        window.alert("Login Successful");
        navigate("/admin/dashboard");
      })
      .catch(error => {
        console.error('Error during login:', error);
        window.alert("Invalid Credentials");
      });
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5001/api/auth/forgotPassword', { email })
      .then((res) => {
        alert("Reset link sent to your email");
        setShowForm('signin');
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send reset link");
      });
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input id="tab-1" type="radio" name="tab" className="sign-in" checked readOnly />
        <label htmlFor="tab-1" className="tab">{showForm === 'signin' ? 'Sign In' : 'Forgot Password'}</label>

        <div className="login-form">
          {showForm === 'signin' ? (
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="group">
                <label htmlFor="password" className="label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  onClick={handleSignIn}
                />
              </div>
              <div className="hr" />
              <div className="foot-lnk">
                <span onClick={() => setShowForm('forgot')} style={{ cursor: 'pointer' }}>
                  Forgot Password?
                </span>
              </div>
            </div>
          ) : (
            <div className="sign-in-htm">
              <div className="group">
                <label htmlFor="email" className="label">Enter your email</label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Send Reset Link"
                  onClick={handleForgotPassword}
                />
              </div>
              <div className="foot-lnk">
                <span onClick={() => setShowForm('signin')} style={{ cursor: 'pointer' }}>
                  Back to Login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;