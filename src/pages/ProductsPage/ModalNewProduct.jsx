import React from 'react'
import { AddProductForm } from './NewProductForm';
import Button from '../../components/common/Button/Button';

export default function ModalNewProduct({ show, modalTitle, handleModal }) {
  if (!show) {
    return null;
  }


  return (
    <div className="absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center">
      <div className="bg-gray-200 z-50 opacity-100 w-full max-w-lg md:w-1/2 lg:w-1/3 p-5 rounded-lg shadow-lg flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex justify-between items-center p-3 rounded-t-lg">
          <div />
          <h2 className="text-lg translate-x-3 font-semibold">Agregar Producto</h2>
          <Button
            className="text-xl font-bold"
            children={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#1b295f" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" /></svg>}
            type="button"
            id="close-modal-btn"
            onClick={handleModal}
          />
        </div>
        <AddProductForm />
      </div>
    </div>



  )
}
