import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('username');

  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
