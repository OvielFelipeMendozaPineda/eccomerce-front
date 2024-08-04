import React from 'react';
import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import { Outlet } from 'react-router-dom';


export const DefaultComponent = () => {
  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el contenido por defecto.</p>
    </div>
  );
};


export const Home = () => {
  return (
    <div id='home' className='flex'>
      <SidebarMenu />
      <div   id='main-display' className='w-full'>
        <Outlet />
      </div>
    </div>
  )
};
