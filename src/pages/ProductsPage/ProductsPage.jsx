import React, { useState, useEffect } from 'react';
import Table from '../../components/common/Table/Table';
import Header from '../../components/common/Header/Header';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { ViewProductModal, ConfirmDeleteModal } from '../../components/common/ModalsProduct/ModalsProduct';
import { ModalEditar } from '../../components/ModalEditar/ModalEditar';
import ModalNewProduct from './ModalNewProduct';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';

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

const getAllProducts = async () => {
  try {
    const response = await axios.get('/admin/producto/getAll');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

const getAllGamas = async () => {
  try {
    const response = await axios.get('/public/gama/getAll');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all gamas:', error);
    return [];
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [gamas, setGamas] = useState([]);
  const [selectedGama, setSelectedGama] = useState('');
  const [selectedStockRange, setSelectedStockRange] = useState([0, 100]);
  const [stockFilterVisible, setStockFilterVisible] = useState(false);

  const headers = [
    { title: 'ID', key: 'id', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' },
    { title: 'Nombre', key: 'nombre', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' },
    { title: 'Precio', key: 'precio', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' }
  ];

  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    const fetchGamas = async () => {
      const gamaData = await getAllGamas();
      setGamas(gamaData);
    };

    fetchProducts();
    fetchGamas();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setConfirmDeleteVisible(true);
  };

  const handleEditSave = async (updatedProduct) => {
    const data = new FormData();

    data.append('producto', new Blob([JSON.stringify({
      nombre: updatedProduct.nombre,
      descripcion: updatedProduct.descripcion,
      precio: updatedProduct.precio,
      gamaId: updatedProduct.gamaId,
      proveedorId: updatedProduct.proveedorId,
      estado: updatedProduct.estado
    })], { type: 'application/json' }));

    if (updatedProduct.imagen) {
      data.append('imagen', updatedProduct.imagen);
    }

    try {
      const response = await axios.put(`/admin/producto/update/${updatedProduct.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Producto actualizado con éxito',
      });
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el producto',
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const URL = `/admin/producto/delete/${selectedProduct.id}`;
      const response = await axios.delete(URL);
      if (response.status === 200) {
        Toast.fire('Success', 'Producto eliminado con éxito', 'success');
        setProducts(products.filter(product => product.id !== selectedProduct.id));
      }
    } catch (error) {
      Toast.fire('Error', 'No se pudo eliminar el producto.', 'error');
    }
    setConfirmDeleteVisible(false);
  };

  const handleGamaChange = async (e) => {
    const selectedGama = e.target.value;
    setSelectedGama(selectedGama);

    if (selectedGama) {
      try {
        const response = await axios.get(`/admin/producto/getByGamaId/${selectedGama}`);
        setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching products by gama:', error);
      }
    } else {
      const data = await getAllProducts();
      setProducts(data);
    }
  };

  const handleStockChange = async (e) => {
    const newRange = e.target.value;
    setSelectedStockRange(newRange);

    try {
      const response = await axios.get(`/admin/producto/getByStock/${newRange}`);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products by stock:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <div className='my-5 text-3xl font-medium'><Header pageTitle={"Productos"} /></div>
        <div className='w-96 my-5'><SearchBar /></div>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center'>
          <div className='w-full md:w-1/3 mb-5'>
            <Button
              children={'Filtrar por Gama'}
              className={'bg-gray-200 w-full p-3 rounded-xl font-medium hover:bg-gray-300'}
              type={'button'}
              onClick={() => document.getElementById('gamaSelect').classList.toggle('hidden')}
            />
            <select
              id="gamaSelect"
              value={selectedGama}
              onChange={handleGamaChange}
              className="hidden mt-1 w-full p-2 border-gray-300 rounded-md shadow-sm"
            >
              <option value=''>Todas las gamas</option>
              {gamas.map((gama) => (
                <option key={gama.id} value={gama.id}>{gama.nombre}</option>
              ))}
            </select>
          </div>

          <div className='w-full md:w-1/3 mb-5'>
            <Button
              children={'Filtrar por Stock'}
              className={'bg-gray-200 w-full p-3 rounded-xl font-medium hover:bg-gray-300'}
              type={'button'}
              onClick={() => setStockFilterVisible(!stockFilterVisible)}
            />
            {stockFilterVisible && (
              <div className="mt-2">
                <input
                  id="stockRange"
                  type="range"
                  min="0"
                  max="100"
                  value={selectedStockRange}
                  onChange={handleStockChange}
                  className="w-full"
                />
                <span>Stock: {selectedStockRange}</span>
              </div>
            )}
          </div>

          <div className='w-full md:w-1/3'>
            <Button children={'Crear nuevo producto'} id={"create-product-btn"} className={'bg-gray-200 w-full p-3 rounded-xl font-medium hover:bg-gray-300'} onClick={handleModal} type={'button'} />
          </div>
        </div>
        <div className='mt-10'>
          <Table
            headers={headers}
            notShow={true}
            data={products}
            onEdit={handleEditClick}
            onView={handleViewClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      <ModalNewProduct show={showModal} handleModal={handleModal} />
      <ModalEditar objecto={selectedProduct} show={editModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleEditSave} entidad={"Producto"} />
      <ViewProductModal product={selectedProduct} show={viewModalVisible} onClose={() => setViewModalVisible(false)} />
      <ConfirmDeleteModal show={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} onConfirm={handleDeleteConfirm} />
    </>
  );
}
