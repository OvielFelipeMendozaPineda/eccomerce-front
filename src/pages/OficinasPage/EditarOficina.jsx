
import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';

const EditarOficina = ({ show, onClose, onSave, oficina, confirmEdit }) => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    telefono: '',
    direccion: {
      tipoCalle: '',
      nombreCalle: '',
      numeroCalle: '',
      numeroComplemento: '',
      codigoPostal: '',
      ciudad: ''
    },
  });

  useEffect(() => {
    if (oficina) {
      setFormData((prevData) => ({
        ...prevData,
        id: oficina.id,
      }));
    }
  }, [oficina]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('direccion.')) {
      const key = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        direccion: {
          ...prevData.direccion,
          [key]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    confirmEdit(formData)
    e.preventDefault();
    onClose();
  };


  if (!show) return null;

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in z-10">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-xl w-full">
        <div className="header px-5 py-3 flex justify-between items-center">
          <h2 className="text-xl font-medium">Editar Oficina</h2>
          <Button children={<box-icon className='text-4xl flex justify-center items-center' name='x-circle'></box-icon>} id='close-create-office-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre de la Oficina
            </label>
            <input
              type="text"
              id="nombre"
              placeholder={oficina.nombre}
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}

              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              placeholder={oficina.telefono}
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <fieldset className="mb-4">
            <legend className="text-sm font-medium text-gray-700">Dirección</legend>

            <div className="mb-4">
              <label htmlFor="tipoCalle" className="block text-sm font-medium text-gray-700">
                Tipo de Calle
              </label>
              <input
                type="text"
                id="tipoCalle"
                placeholder={oficina.direccion.tipoCalle}
                name="direccion.tipoCalle"
                value={formData.direccion.tipoCalle}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nombreCalle" className="block text-sm font-medium text-gray-700">
                Nombre de la Calle
              </label>
              <input
                type="text"
                id="nombreCalle"
                placeholder={oficina.direccion.nombreCalle}
                name="direccion.nombreCalle"
                value={formData.direccion.nombreCalle}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="numeroCalle" className="block text-sm font-medium text-gray-700">
                Número de la Calle
              </label>
              <input
                type="text"
                id="numeroCalle"
                placeholder={oficina.direccion.numeroCalle}
                name="direccion.numeroCalle"
                value={formData.direccion.numeroCalle}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="numeroComplemento" className="block text-sm font-medium text-gray-700">
                Número de Complemento
              </label>
              <input
                type="text"
                id="numeroComplemento"
                placeholder={oficina.direccion.numeroComplemento}
                name="direccion.numeroComplemento"
                value={formData.direccion.numeroComplemento}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
                Código Postal
              </label>
              <input
                type="text"
                id="codigoPostal"
                placeholder={oficina.direccion.codigoPostal}
                name="direccion.codigoPostal"
                value={formData.direccion.codigoPostal}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                placeholder={oficina.direccion.ciudad}
                name="direccion.ciudad"
                value={formData.direccion.ciudad}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Actualizar oficina
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarOficina;
