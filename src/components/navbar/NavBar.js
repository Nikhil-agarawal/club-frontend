import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserShield, faTachometerAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, NavLink } from 'react-router-dom';
import { logo } from '../../Data/data';
import './NavBar.css';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle logout functionality
  const HandleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');  // Also clear role
    navigate("/login"); // Redirect to login page
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="navbar-container">
      <header className="navbar">
        <div className="logo">
          <a href="https://nitkkr.ac.in" target="_blank" rel="noopener noreferrer">
            <img src={logo[0].image} alt="NIT KKR Logo" />
          </a>
        </div>

        <nav ref={menuRef} className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/clubs" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                Clubs
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                Events
              </NavLink>
            </li>
            <li>
              <NavLink to="/pastevents" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
            {/* Mobile Menu Auth Buttons */}
            <li className="mobile-auth-buttons">
              {isLoggedIn && (
                <NavLink to="/admin/dashboard" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                  <FontAwesomeIcon icon={faTachometerAlt} />
                  <span>Dashboard</span>
                </NavLink>
              )}
              {!isLoggedIn ? (
                !role || role === "member" ? (
                  <a href="/login" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                    <FontAwesomeIcon icon={faUserShield} />
                    <span>Login</span>
                  </a>
                ) : null
              ) : (
                <button className="mobile-nav-link" onClick={() => {
                  HandleLogout();
                  setIsMenuOpen(false);
                }}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </button>
              )}
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          {isLoggedIn && (
            <NavLink to="/admin/dashboard" className="admin-dashboard-btn" onClick={() => setIsMenuOpen(false)}>
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span>Dashboard</span>
            </NavLink>
          )}

          {!isLoggedIn ? (
            !role || role === "member" ? (
              <a href="/login" className="admin-login-btn">
                <FontAwesomeIcon icon={faUserShield} />
                <span>Login</span>
              </a>
            ) : null
          ) : (
            <button className="logout-btn" onClick={HandleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          )}
        </div>

        <button ref={buttonRef} className="mobile-menu-btn" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </header>
    </div>
  );
}

export default Navbar;
