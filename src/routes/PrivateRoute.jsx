import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Corrected import

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth(); // Access the token from context

  // If no token is found, redirect to the login page
  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
