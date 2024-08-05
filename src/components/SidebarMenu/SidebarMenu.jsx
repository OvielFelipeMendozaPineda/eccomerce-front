import React, { useState } from 'react';
import Button from '../common/Button/Button';

function MenuItem({ icon, itemText, arrow, isCollapsed, isSelected, onClick }) {
  return (
    <div 
    onClick={onClick}
    className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} space-x-2 mx-5 my-1 p-3 hover:bg-blue-900 cursor-pointer rounded-lg ${isSelected? 'bg-blue-700': ''}`}>
      <div className='flex gap-5 items-center transition-transform duration-300 ease'>
        <div className="text-xl">
          {icon}
        </div>
        {!isCollapsed && (
          <div className="text-xl text-white font-medium">
            {itemText}
          </div>
        )}
      </div>
      {!isCollapsed && (
        <div className='flex justify-center items-center'>
          {arrow}
        </div>
      )}
    </div>
  );
}

function Header({ imgUrl, headerTitle, isCollapsed }) {
  return (
    <div className='transition-transform duration-300 ease hover:scale-105 cursor-pointer flex justify-center flex-col items-center'>
      <div className='flex justify-center'>
      <img 
          src={imgUrl} 
          className={`transition-all ${isCollapsed ? 'transition-fast w-16' : 'transition-slow w-44'}`} 
          alt="Logo" 
        />
      </div>
      {!isCollapsed && (
        <div className={`transition-opacity duration-300 ease-in-out ${isCollapsed ? 'opacity-0 delay-300' : 'opacity-0'}`}>
        <h3 className='text-2xl text-white font-bold'>{headerTitle}</h3>
      </div>
      
      )}
    </div>
  );
}

export default function SidebarMenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState("home");

  const toggleCollapse = () => {
    setIsCollapsed(prevState => !prevState);
  };
  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className={`grid grid-rows-3 ${isCollapsed ? 'w-32' : 'w-96'} h-screen bg-blue-950 transition-all duration-100 ease-in-out`}>
      <Header
        imgUrl="https://moufflet.co/wp-content/uploads/2020/08/logohome2.png"
        headerTitle="Mofflet"
        isCollapsed={isCollapsed}
      />
      <div className={`flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
        <MenuItem
          icon={<i className='bx bx-home-alt-2 text-white'></i>}
          itemText="Página principal"
          arrow={<i className={`bx bx-chevron-right text-xl text-white ${isCollapsed ? 'hidden' : 'visible'}`}></i>}
          isCollapsed={isCollapsed}
          isSelected={selectedItem === 'home'}
          onClick={() => handleMenuItemClick('home')}
        />
        <MenuItem
          icon={<i className='bx bx-home-alt-2 text-white'></i>}
          itemText="Productos"
          arrow={<i className={`bx bx-chevron-right text-xl text-white ${isCollapsed ? 'hidden' : 'visible'}`}></i>}
          isCollapsed={isCollapsed}
          isSelected={selectedItem === 'products'}
          onClick={() => handleMenuItemClick('products')}
        />
        <MenuItem
          icon={<i className='bx bx-home-alt-2 text-white'></i>}
          itemText="Clientes"
          arrow={<i className={`bx bx-chevron-right text-xl text-white ${isCollapsed ? 'hidden' : 'visible'}`}></i>}
          isCollapsed={isCollapsed}
          isSelected={selectedItem === 'customer'}
          onClick={() => handleMenuItemClick('customer')}
        />
        <MenuItem
          icon={<i className='bx bx-home-alt-2 text-white'></i>}
          itemText="Pedidos"
          arrow={<i className={`bx bx-chevron-right text-xl text-white ${isCollapsed ? 'hidden' : 'visible'}`}></i>}
          isCollapsed={isCollapsed}
          isSelected={selectedItem === 'orders'}
          onClick={() => handleMenuItemClick('orders')}
        />
      </div>
      <div className='flex justify-between items-center self-end text-white m-5 rounded-lg p-3 font-bold'>
        {!isCollapsed && (
          <Button
            id='logout-btn'
            type='button'
            className='hover:bg-blue-900 px-5 py-2 rounded-xl'
            children='Cerrar sesión'
          />
        )}
        <Button
          id='collapse-btn'
          type='button'
          onClick={toggleCollapse}
          className='hover:bg-blue-900 rounded-full px-2 py-1'
          children={<i className={`bx ${isCollapsed ? 'bx-chevron-right' : 'bx-chevron-left'}`}></i>}
        />
      </div>
    </div>
  );
}