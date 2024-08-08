import React, { useEffect, useState } from 'react';
import Button from '../common/Button/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditarCliente({ customer, show, handleModal }) {
  const [isVisible, setIsVisible] = useState(show);
  const [formData, setformData] = useState(customer);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      setTimeout(() => setLoading(false), 1000); 
    }
  }, [show]);

  if (!isVisible) {
    return null;
  }

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const handleClick = () => {
    setIsVisible(false);
    handleModal(false);
  };





  return (
    <div className="absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className='bg-gray-50 p-5'>
        <div className='header p-3 flex flex-row gap-5'>
          <div className='w-10'></div>
          <h2 className='text-2xl font-medium'>Información del cliente</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-editar-cliente-btn' onClick={handleClick} type='button' className={'flex justify-end items-center'} />
        </div>
        <div className='inputs flex p-5 flex-col gap-5'>
          {loading ? (

            Object.keys(customer).map((key) => (
              <div key={key} className='flex gap-5 justify-between items-center'>
                <div className='w-24 bg-gray-300 rounded-lg h-6 animate-pulse'></div>
                <div className='bg-gray-200 rounded-lg w-full h-8 animate-pulse'></div>
              </div>
            ))
          ) : (
            Object.entries(customer).map(([key, value]) => (
              <div key={key} className='flex gap-5 justify-between items-center'>
                <label htmlFor={key}>{key}</label>
                <input type="text" disabled={true} name={key} className='rounded-lg' value={value} />
              </div>
            ))
          )}
        </div>
        
      </div>
    </div>
  );
}
