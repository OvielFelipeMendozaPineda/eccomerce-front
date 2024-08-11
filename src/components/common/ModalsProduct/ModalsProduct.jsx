import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';



const ViewProductModal = ({ product, show, onClose }) => {
  if (!show) return null;

  let imageUrl = null;

  if (product.imagen) {
    try {
      // Si product.imagen ya es una cadena base64, simplemente añádelo al prefijo
      imageUrl = `data:image/jpeg;base64,${product.imagen}`; // Cambia a image/png si es necesario
    } catch (error) {
      console.error("Error al crear la URL de la imagen: ", error);
    }
  }

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="header p-3 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Detalles del Producto</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-view-product-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <div className="flex flex-col w-96 gap-5">
          {imageUrl ? (
            <img src={imageUrl} alt={product.nombre} className="w-full h-auto rounded-lg" />
          ) : (
            <p>No se pudo cargar la imagen.</p>
          )}
          <p><strong>Nombre:</strong> {product.nombre}</p>
          <p><strong>Precio:</strong> {product.precio}</p>
          <p><strong>Estado:</strong> {product.estado === true ? "Activo" : "Desactivo"}</p>
        </div>
      </div>
    </div>
  );
};





const ConfirmDeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="header p-3 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Confirmar Eliminación</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-confirm-delete-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onConfirm} className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700">Sí</button>
          <button onClick={onClose} className="bg-gray-300 rounded-lg p-2 hover:bg-gray-400">No</button>
        </div>
      </div>
    </div>
  );
};

export { ViewProductModal, ConfirmDeleteModal };
