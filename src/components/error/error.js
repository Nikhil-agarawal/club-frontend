import React from 'react';
import { Link } from 'react-router-dom';
import './error.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="oops-text">Oops!</div>
        <div className="error-animation">
          <div className="error-number">4</div>
          <div className="error-zero">
            <div className="error-circle"></div>
          </div>
          <div className="error-number">4</div>
        </div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-message">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" className="error-button">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
