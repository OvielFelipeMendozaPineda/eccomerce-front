import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditProductModal = ({ objecto, show, onClose, onSave, entidad }) => {
    const [formData, setFormData] = useState({ ...objecto });
  
    useEffect(() => {
      if (objecto) {
        setFormData({ ...objecto });
      }
    }, [objecto]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    if (!show) return null;
  
    return (
      <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
        <div className="bg-gray-50 p-5 rounded-lg">
          <div className="header p-3 flex justify-between items-center">
            <h2 className="text-2xl font-medium">Editar {entidad}</h2>
            <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-edit-object-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {Object.entries(formData)
              .filter(([key]) => key !== 'id')
              .map(([key, value]) => (
                <label key={key} className="flex flex-col">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="rounded-lg p-2 w-full border border-gray-300"
                  />
                </label>
              ))}
            <button type="submit" className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700">Guardar</button>
          </form>
        </div>
      </div>
    );
  };

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
          <div className="flex flex-col gap-5">
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

export { EditProductModal, ViewProductModal, ConfirmDeleteModal };
