import React, { useState, useEffect } from 'react';
import Table from '../../components/common/Table/Table';
import Header from '../../components/common/Header/Header';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import { ModalEditarOffice, ViewOfficeModal, ConfirmDeleteModalOffice } from '../../components/common/ModalsOffice/ModalsOffice';
import CrearOfficeModal from './CrearOfficeModal';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
import EditarOficina from './EditarOficina';

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

// Función para obtener todas las oficinas
const getAllOffices = async () => {
  try {
    const response = await axios.get('/admin/oficinas/getAll');
    console.log(response.data);
    return response.data || [];


  } catch (error) {
    console.error('Error fetching all offices:', error);
    return [];
  }
};

export default function OficinasPage() {
  const [offices, setOffices] = useState([]);
  const headers = [
    { title: 'ID', key: 'id', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' },
    { title: 'Nombre', key: 'nombre', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' },
    {
      title: 'Dirección',
      key: 'direccion',
      className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal',
      render: (office) => {
        if (!office.direccion) return 'Sin dirección';
        const { tipoCalle, nombreCalle, numeroCalle, numeroComplemento, ciudad } = office.direccion;
        return `${tipoCalle || ''} ${nombreCalle || ''} ${numeroCalle || ''} ${numeroComplemento ? `#${numeroComplemento}` : ''}, ${ciudad || ''}`;
      }
    },
    { title: 'Teléfono', key: 'telefono', className: 'px-4 py-3 text-left text-[#0e141b] text-sm font-medium leading-normal' }
  ];



  const [showModal, setShowModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      const data = await getAllOffices();
      setOffices(data);
    };
    fetchOffices();
  }, []);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditClick = (office) => {
    setSelectedOffice(office);
    setEditModalVisible(true);

  };

  const handleViewClick = (office) => {
    setSelectedOffice(office);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (office) => {
    setSelectedOffice(office);
    setConfirmDeleteVisible(true);
  };

  const handleEditSave = async (updatedOffice) => {
    console.log(updatedOffice);
    
    try {
      const response = await axios.put(`/admin/oficinas/update`, updatedOffice);
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Oficina actualizada con éxito',
        });
        setEditModalVisible(false);
        const data = await getAllOffices();
        setOffices(data);
      }
    } catch (error) {
      console.error('Error al actualizar la oficina:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar la oficina',
      });
    }
  };

  const handleCreateSave = async (newOffice) => {
    try {
      const response = await axios.post('/admin/oficinas/create', newOffice);
      console.log("Server Response:", response.data);
      Toast.fire({
        icon: 'success',
        title: 'Oficina creada con éxito',
      });
      setShowModal(false);

      const data = await getAllOffices();
      setOffices(data);
    } catch (error) {
      console.error('Error al crear la oficina:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al crear la oficina',
      });
    }
  };


  const handleDeleteConfirm = async () => {
    try {
      console.log(selectedOffice.id);
      
      const URL = `/admin/oficinas/delete?id=${selectedOffice.id}`;
      const response = await axios.delete(URL);
      if (response.status === 200) {
        Toast.fire('Success', 'Oficina eliminada con éxito', 'success');
        setOffices(offices.filter(office => office.id !== selectedOffice.id));
      }
    } catch (error) {
      Toast.fire('Error', 'No se pudo eliminar la oficina.', 'error');
    }
    setConfirmDeleteVisible(false);
  };

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <div className='my-5 text-3xl font-medium'><Header pageTitle={"Oficinas"} /></div>
        <div className='w-96 my-5'><SearchBar /></div>
        <div className='flex justify-end w-96'>
          <div className='w-96 my-5'>
            <Button children={'Crear nueva Oficina'} id={"create-product-btn"} className={'bg-gray-200 w-full p-3 rounded-xl font-medium hover:bg-gray-300'} onClick={handleModal} type={'button'} />
          </div>
        </div>
        <div className='mt-10'>
          <Table
            headers={headers}
            notShow={false}
            data={offices}
            onEdit={handleEditClick}
            onView={handleViewClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      <CrearOfficeModal show={showModal} onClose={handleModal} onSave={handleCreateSave} />
      <ViewOfficeModal office={selectedOffice} show={viewModalVisible} onClose={() => setViewModalVisible(false)} />
      <EditarOficina show={editModalVisible} onClose={() => setEditModalVisible(false)} confirmEdit={handleEditSave} oficina={selectedOffice} />
      <ConfirmDeleteModalOffice show={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} onConfirm={handleDeleteConfirm} />
    </>
  );
}
