import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './login.css';

const API_URL=process.env.REACT_APP_API_URL;

function ResetPassword() {
  const { id, token } = useParams(); // from URL: /reset-password/:id/:token
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/resetPassword`, {
        userId: id,
        token: token,
        newPassword: newPassword
      });

      setSuccess(response.data.message);
      setError('');
      setTimeout(() => navigate('/'), 3001); // redirect to login after 3s
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
      setSuccess('');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-html">
        <div className="login-form">
          <h2 style={{ textAlign: 'center', color: 'white' }}>Reset Password</h2>
          <form onSubmit={handleReset}>
            <div className="group">
              <label htmlFor="newpass" className="label">New Password</label>
              <input
                id="newpass"
                type="password"
                className="input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="group">
              <label htmlFor="confirmpass" className="label">Confirm Password</label>
              <input
                id="confirmpass"
                type="password"
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="group">
              <input type="submit" className="button" value="Reset Password" />
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'lightgreen', textAlign: 'center' }}>{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
