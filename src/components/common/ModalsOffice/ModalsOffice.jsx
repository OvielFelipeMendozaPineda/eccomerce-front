import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

const ModalEditarOffice = ({ objecto, show, onClose, onSave, entidad }) => {
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
        <div className="header px-5 py-3 flex justify-bet gap-10 items-center">
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

const ViewOfficeModal = ({ office, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="header p-3 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Detalles de la oficina</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-view-office-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <div className="flex flex-col gap-5">
          <p><strong>Nombre:</strong> {office.nombre}</p>
          <p><strong>Tipo Calle:</strong> {office.tipoCalle}</p>
          <p><strong>Teléfono:</strong> {office.telefono}</p>
          {/* Añade aquí otros campos según el DTO de la oficina */}
        </div>
      </div>
    </div>
  );
};

const ConfirmDeleteModalOffice = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="header p-3 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Confirmar Eliminación</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-confirm-delete-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <p>¿Estás seguro de que deseas eliminar esta oficina?</p>
        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onConfirm} className="bg-red-600 text-white rounded-lg p-2 hover:bg-red-700">Sí</button>
          <button onClick={onClose} className="bg-gray-300 rounded-lg p-2 hover:bg-gray-400">No</button>
        </div>
      </div>
    </div>
  );
};

export { ModalEditarOffice, ViewOfficeModal, ConfirmDeleteModalOffice };
