import React, { useState, useEffect } from 'react';
import Button from '../common/Button/Button';

export const ModalEditar = ({ objecto, show, onClose, onSave, entidad }) => {
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
      <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
        <div className="bg-gray-50 p-10 rounded-lg">
          <div className="header px-5 py-3 flex justify-bet gap-10  items-center">
            <h2 className="text-xl self-start -translate-y-1 font-medium">Editar {entidad}</h2>
            <Button children={<box-icon className='text-4xl flex justify-center items-center' name='x-circle'></box-icon>} id='close-edit-object-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
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
