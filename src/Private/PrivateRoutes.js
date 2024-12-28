import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

  return isAuthenticated ? children : <Navigate to="/login" replace />; // Redirect if not authenticated
};

export default PrivateRoutes;