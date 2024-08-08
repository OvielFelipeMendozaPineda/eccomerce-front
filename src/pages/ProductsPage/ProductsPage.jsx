import React, { useState } from 'react';
import Table from '../../components/common/Table/Table';
import Header from '../../components/common/Header/Header';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/Modal/Modal';
import { productInput, dropdownInput } from '../../utils/inputs/product/product';
import { EditProductModal, ViewProductModal, ConfirmDeleteModal } from '../../components/common/ModalsProduct/ModalsProduct';
import { ModalEditar } from '../../components/ModalEditar/ModalEditar';

export default function ProductsPage() {
  const products = [
    { id: 1, imageUrl: 'https://cdn.usegalileo.ai/stability/90aa788c-1e5b-4186-91ce-c2ad34320bbf.png', name: 'Coffee Mug', price: '$15', inventory: '12', status: 'Active' },
    { id: 2, imageUrl: 'https://cdn.usegalileo.ai/stability/90aa788c-1e5b-4186-91ce-c2ad34320bbf.png', name: 'Coffee Mug', price: '$20', inventory: '12', status: 'Active' },
  ];

  const headers = [
    { title: 'Product', key: 'name', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-176 px-4 py-3 text-left text-[#0e141b] w-[400px] text-sm font-medium leading-normal' },
    { title: 'Price', key: 'price', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-296 px-4 py-3 text-left text-[#4f7296] w-[400px] text-sm font-medium leading-normal' },
    { title: 'Inventory', key: 'inventory', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-416 px-4 py-3 text-left text-[#4f7296] w-[400px] text-sm font-medium leading-normal' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleEditSave = (updatedProduct) => {
    // Lógica para guardar los cambios en el producto
    setEditModalVisible(false);
    console.log('Product updated:', updatedProduct);
  };

  const handleDeleteConfirm = () => {
    // Lógica para eliminar el producto
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
      <Modal modalTitle="Crear producto" fields={productInput} dropdownFields={dropdownInput} show={showModal} handleModal={handleModal} />
      <ModalEditar objecto={selectedProduct} show={editModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleEditSave} entidad={"Producto"} />
      <ViewProductModal product={selectedProduct} show={viewModalVisible} onClose={() => setViewModalVisible(false)} />
      <ConfirmDeleteModal show={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} onConfirm={handleDeleteConfirm} />
    </>
  );
}
