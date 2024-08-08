import axios from '../../utils/axios/ConfigAxios';
import React, { useState, useEffect } from 'react';

export const AddProductForm = () => {
  const [proveedores, setProveedores] = useState([]);
  const [gamas, setGamas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    gamaId: '',
    proveedorId: '',
    imagen: null,
    estado: ''
  });

  useEffect(() => {
    axios.get('/admin/proveedor/getAll').then((response) => {
      setProveedores(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('/public/gama/getAll').then((response) => {
      setGamas(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData((prevData) => ({ ...prevData, imagen: file }));
    } else {
      alert('Please select a valid image file (jpg or png)');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData((prevData) => ({ ...prevData, imagen: file }));
    } else {
      alert('Please select a valid image file (jpg or png)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    // Crear un Blob para el JSON con el tipo 'application/json'
    data.append('producto', new Blob([JSON.stringify({
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      gamaId: formData.gamaId,
      proveedorId: formData.proveedorId,
      estado: formData.estado
    })], { type: 'application/json' }));

    // Añadir la imagen si está disponible
    if (formData.imagen) {
      data.append('imagen', formData.imagen);
    }

    axios.post('/admin/producto/crear', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Producto creado con éxito:', response.data);
      })
      .catch((error) => {
        console.error('Error al crear el producto:', error);
      });
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 shadow-md rounded-md bg-white">
      <div className="mb-4">
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
          Nombre del Producto
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
          type="text"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gamaId" className="block text-sm font-medium text-gray-700">
          Gama
        </label>
        <select
          id="gamaId"
          name="gamaId"
          value={formData.gamaId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Selecciona una gama</option>
          {gamas.map((gama) => (
            <option key={gama.id} value={gama.id}>
              {gama.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="proveedorId" className="block text-sm font-medium text-gray-700">
          Proveedor
        </label>
        <select
          id="proveedorId"
          name="proveedorId"
          value={formData.proveedorId}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
          Imagen del Producto
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="mt-1 flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-md p-4"
        >
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept=".jpg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          {formData.imagen ? (
            <div className="text-center">
              <img src={URL.createObjectURL(formData.imagen)} alt="Imagen del producto" className="h-40 mx-auto" />
              <p>{formData.imagen.name}</p>
            </div>
          ) : (
            <label
              htmlFor="imagen"
              className="cursor-pointer flex flex-col items-center justify-center h-20 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm5 0a3 3 0 100 6 3 3 0 000-6zm1 8a1 1 0 10-2 0 1 1 0 002 0zm6-6a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Arrastra y suelta o haz clic para seleccionar una imagen</span>
            </label>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        >
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Agregar Producto
      </button>
    </form>
  );
};
