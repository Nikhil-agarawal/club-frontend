import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import './login.css';

const API_URL=process.env.REACT_APP_API_URL;
console.log(API_URL);

function UnifiedLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Case-insensitive path detection
  const getInitialRole = () => {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/adminlogin')) return 'admin';
    return 'member';
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(getInitialRole());
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  // Update the URL based on the active tab
  useEffect(() => {
    if (activeTab === 'admin') {
      window.history.pushState({}, '', '/Adminlogin');
    } else {
      window.history.pushState({}, '', '/login');
    }
  }, [activeTab]);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignIn = (e) => {
    e.preventDefault();

    const data = { email, password };
    const endpoint = activeTab === 'member'
      ? `${API_URL}/api/auth/userlogin`
      : `${API_URL}/api/auth/adminlogin`;

    axios.post(endpoint, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', activeTab);

        if (activeTab === 'admin') {
          navigate("/admin/dashboard");
        } else {
          navigate("/admin-home");
        }

        window.alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Login Successful`);
      })
      .catch((err) => {
        console.error('Login Error:', err);
        window.alert("Invalid Credentials");
      });
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      return window.alert("Please enter your email");
    }

    try {
      const endpoint = activeTab === 'member'
        ? `${API_URL}/api/auth/forgotPassword`
        : `${API_URL}/api/auth/forgotPassword`;

      const res = await axios.post(endpoint, { email: forgotEmail });
      setForgotMessage("Reset link sent! Please check your email.");
    } catch (err) {
      console.error(err);
      setForgotMessage("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          checked={activeTab === 'member'}
          onChange={() => setActiveTab('member')}
        />
        <label htmlFor="tab-1" className="tab">Member Login</label>

        <input
          id="tab-2"
          type="radio"
          name="tab"
          className="sign-up"
          checked={activeTab === 'admin'}
          onChange={() => setActiveTab('admin')}
        />
        <label htmlFor="tab-2" className="tab">Admin Login</label>

        <div className="login-form">
          <div className={activeTab === 'member' ? 'sign-in-htm active' : 'sign-in-htm'}>
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
               <div className="group password-group">
                <label htmlFor="password" className="label">Password</label>
                <div className="password-wrapper">
                    <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                </div>    

            <div className="group">
              <input
                type="submit"
                className="button"
                value={`Sign In as ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                onClick={handleSignIn}
              />
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
            <h3>Forgot {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Password</h3>
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

export default UnifiedLogin;
