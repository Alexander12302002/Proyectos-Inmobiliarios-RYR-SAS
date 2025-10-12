import React from 'react';
import { Navigate } from 'react-router-dom';

const getTokenFromCookie = () => {
  const tokenCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='));
  if (!tokenCookie) return null;
  return tokenCookie.split('=')[1]; // Extrae solo el valor del token
};

const ProtectedRoute = ({ children }) => {
  const token = getTokenFromCookie();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
