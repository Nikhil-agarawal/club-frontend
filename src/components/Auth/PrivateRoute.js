import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get the role from localStorage

  if (!token) {
    // If no token, navigate to login page
    return <Navigate to="/login" />;
  }

  // If user is admin and trying to access member route, redirect
  if (role === 'member' && userRole !== 'member') {
    return <Navigate to="/error" />;
  }

  // If user is member and trying to access admin route, redirect
  if (role === 'admin' && userRole !== 'admin') {
    return <Navigate to="/admin-home" />;
  }

  return children; // Render the protected component
};

export default PrivateRoute;
