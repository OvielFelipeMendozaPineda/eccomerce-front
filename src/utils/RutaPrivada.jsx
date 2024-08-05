import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Authorized';

const RutaPrivada = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default RutaPrivada;
