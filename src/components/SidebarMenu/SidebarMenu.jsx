import React from 'react'
import Button from '../common/Button/Button'
import { logDOM } from '@testing-library/react';

function MenuItem({ icon, itemTetx, arrow }) {
    return (
        <div className='flex justify-between space-x-2 mx-5 my-1 p-3 hover:bg-blue-900 cursor-pointer rounded-lg'>
            <div className='flex space-x-3 justify-start'>
                <div className="text-xl">
                    {icon}
                </div>
                <div className="text-xl  text-white font-medium">
                    {itemTetx}
                </div>
            </div>
            <div className='flex justify-center items-center'> {arrow} </div>
        </div>
    )
}

function Header({ imgUrl, headerTitle }) {
    return (
        <div className=' transition-transform duration-300 ease hover:scale-105 cursor-pointer flex flex-col justify-center '>
            <div className='flex justify-center'>
                <img src={imgUrl} className='w-44' />
            </div>
            <div className='flex justify-center py-5'>
                <h3 className='text-2xl text-white font-bold'>{headerTitle}</h3>
            </div>
        </div>
    )
}

export default function SidebarMenu() {

    const collapse = (e) => {
        const collapseBtn= document.querySelector('#collapse-btn')
        if (collapseBtn.innerHTML.includes('bx-chevrons-right')) {
            collapseBtn.innerHTML = '<i class="bx bx-chevrons-left"></i>';
          } else {
            collapseBtn.innerHTML = '<i class="bx bx-chevrons-right"></i>';
          }
        
      
      };
      

    return (
        <div className=' grid grid-rows-3 w-80 h-screen bg-blue-950'>
            <Header imgUrl="https://1000marcas.net/wp-content/uploads/2019/11/Instagram-Logo.png" headerTitle="Mofflet" />
            <div className=''>
                <MenuItem icon={<i className='bx bx-home-alt-2 text-white' ></i>} itemTetx="Pagina principal" arrow={<i className='bx bx-chevron-right text-xl text-white invisible' ></i>} />
                <MenuItem icon={<i className='bx bx-home-alt-2 text-white' ></i>} itemTetx="Productos" arrow={<i className='bx bx-chevron-right text-xl text-white' ></i>} />
                <MenuItem icon={<i className='bx bx-home-alt-2 text-white' ></i>} itemTetx="Clientes" arrow={<i className='bx bx-chevron-right text-xl text-white' ></i>} />
                <MenuItem icon={<i className='bx bx-home-alt-2 text-white' ></i>} itemTetx="Pedidos" arrow={<i className='bx bx-chevron-right text-xl text-white' ></i>} />
            </div>
            <div className='flex justify-between items-center  self-end text-white m-5 rounded-lg p-3 font-bold '>
                <Button id='logout-btn' type='button'  className='hover:bg-blue-900 px-5 py-2 rounded-xl ' children='Cerrar sesion' />
                <Button id='collapse-btn' type='button'  onClick={collapse} className=" hover:bg-blue-900 rounded-full px-2 py-1"children={<i className='bx  bx-chevrons-left'></i>} />
            </div>
        </div>

    )
}
