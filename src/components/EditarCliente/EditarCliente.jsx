import React, { useEffect } from 'react'
import Button from '../common/Button/Button'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'


export default function EditarCliente({ customer, show, handleModal }) {
  const [isVisible, setIsVisible] = useState(show)
  const [formData, setformData] = useState(customer)

  useEffect(() => {
    setIsVisible(show)
  }, [show])

  if (!isVisible) {
    return null
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
    setIsVisible(false)
    handleModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
      const payload = formData
      try {
        const URL = 'admin/cliente/put'
        const response = await axios.post(URL, payload)
        if (response ==  200) {
          Swal.fire(
            
          )
        }
      } catch (error) {
        
      }
      
  }
  return (
    <div className='absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center'>
      <div className='bg-gray-50 p-5'>
        <div className=' header p-3 flex flex-row gap-5 ' >
          <div className='w-10'></div>
          <h2 className='text-2xl font-medium'> Editar informacion</h2>
          <Button children={<box-icon className=' text-4xl' name='x-circle'></box-icon>} id='close-editar-cliente-btn' onClick={handleClick} type='button' className={' flex justify-end items-center'} />
        </div>
        <div className='inputs flex p-5 flex-col gap-5'>
          {Object.entries(customer).map(([key, value]) => (
            <div className='flex gap-5 justify-between items-center'>
              <label htmlFor={key}> {key} </label>
              <input type="text" key={key} name={key} className='rounded-lg ' onChange={handleChange} placeholder={value} />
            </div>
          ))}
        </div>
        <div className=' p-2 flex justify-center items-center'>
          <Button children='Actualizar datos' type='button' className='bg-blue-900 hover:bg-blue-600 hover:cursor-pointer duration-200 hover:scale-105  text-white px-5 py-3 rounded-lg font-medium' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
