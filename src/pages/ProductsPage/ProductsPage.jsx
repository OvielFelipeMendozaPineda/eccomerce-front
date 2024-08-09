import React, { useState, useEffect } from 'react';
import Table from '../../components/common/Table/Table';
import Header from '../../components/common/Header/Header';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { EditProductModal, ViewProductModal, ConfirmDeleteModal } from '../../components/common/ModalsProduct/ModalsProduct';
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

// Función para obtener todos los productos
const getAllProducts = async () => {
  try {
    const response = await axios.get('/admin/producto/getAll');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
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
    fetchProducts();
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

    // Crear un Blob para el JSON con el tipo 'application/json'
    data.append('producto', new Blob([JSON.stringify({
      nombre: updatedProduct.nombre,
      descripcion: updatedProduct.descripcion,
      precio: updatedProduct.precio,
      gamaId: updatedProduct.gamaId,
      proveedorId: updatedProduct.proveedorId,
      estado: updatedProduct.estado
    })], { type: 'application/json' }));

    // Añadir la imagen si está disponible
    if (updatedProduct.imagen) {
      data.append('imagen', updatedProduct.imagen);
    }
    console.log('Data:', data.values());

    axios.put(`/admin/producto/update/${updatedProduct.id}`, data, {
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

  const handleDeleteConfirm = () => {
    setConfirmDeleteVisible(false);
    console.log('Product deleted:', selectedProduct);
  };

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <div className='my-5 text-3xl font-medium'><Header pageTitle={"Productos"} /></div>
        <div className='w-96 my-5'><SearchBar /></div>
        <div className='flex justify-end w-96'>
          <div className='w-96 my-5'>
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
      {/* <ModalEditar objecto={selectedProduct} show={editModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleEditSave} entidad={"Producto"} /> */}
      <EditProductModal objecto={selectedProduct} show={editModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleEditSave} />
      <ViewProductModal product={selectedProduct} show={viewModalVisible} onClose={() => setViewModalVisible(false)} />
      <ConfirmDeleteModal show={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} onConfirm={handleDeleteConfirm} />
    </>
  );
}
