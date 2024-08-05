import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './Authorized';
import LoginPage from '../pages/LoginPage/LoginPage';

const RutaPrivada = () => {
  const { isAuthenticated } = useAuth();
 
  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <LoginPage />
    
  }
  ;
};

export default RutaPrivada;
