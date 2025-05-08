
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import './NotificationPage.css';

const API_URL=process.env.REACT_APP_API_URL;

function App() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  function toggleNotification() {
    setNotificationVisible(!notificationVisible);
    setNotificationCount(0); // reset notification count on click
  }

  function hideNotification() {
    setNotificationVisible(false);
    setNotificationCount(0); // reset notification count on hide
  }

  function handleNotificationSubmit() {
    setNotificationCount(notificationCount + 1);
  }

  return (
    <div className='app-container'>
      <div className='notification-container'>
        <header className="header">
          <nav className="navbar">
            <div className="logo-container">
              {/* Placeholder for logo */}
              <div className="logo">SCB</div>
            </div>
            <ul className="nav-items">
              <li className="nav-item">
                <button className="icon-button notification-btn" onClick={toggleNotification}>
                  <div className="notification-icon">
                    <FontAwesomeIcon icon={faBell} />
                    {notificationCount > 0 && <div className="notification-count">{notificationCount}</div>}
                  </div>
                </button>
              </li>
              <li className="nav-item">
                <a href="/" className="icon-button logout-btn">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span className="tooltip">Logout</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="content">
          {notificationVisible && notificationMessage && (
            <div className="notification-message" onClick={hideNotification}>
              {notificationMessage}
            </div>
          )}
          <NotificationForm 
            setNotificationMessage={setNotificationMessage} 
            handleNotificationSubmit={handleNotificationSubmit} 
          />
        </div>
      </div>
    </div>
  );
}

function NotificationForm({ setNotificationMessage, handleNotificationSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  
  function handleSubmit(event) {
    event.preventDefault();
    setError('');
    
    if (!title || !content) {
      setError('Please fill in both the title and content fields.');
      return;
    }
    
    const data = { title, content };
    
    // Logic to handle the submission of the notification form
    axios.post(`${API_URL}/notify-all`, data)
      .then((res) => {
        swal("Success", "Notification sent", "success");
        handleNotificationSubmit();
        setTitle('');
        setContent('');
      })
      .catch(err => {
        setError('Failed to send notification. Please try again.');
        console.error(err);
      });
  }


return (
    <div className="form-container">
      <h2 className="form-title">Send Notification</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter notification title"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="content">Content</label>
          <textarea
            id="content"
            className="form-input form-textarea"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Enter notification content"
            rows="4"
          />
        </div>
        <button type="submit" className="submit-button">
          Send Notification
        </button>
      </form>
    </div>
  );
}

export default App;