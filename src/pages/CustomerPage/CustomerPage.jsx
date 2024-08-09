import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import Header from '../../components/common/Header/Header';
import Table from '../../components/common/Table/Table';
import Modal from '../../components/Modal/Modal';
import { registerClienteFields } from '../../utils/inputs/product/product';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
import { ModalEditar } from '../../components/ModalEditar/ModalEditar';
import InformacionCliente from '../../components/InformacionCliente/InformacionCliente';
import EliminarCliente from '../../components/EliminarCliente/EliminarCliente';

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

const getAllClientes = async () => {
    try {
        const response = await axios.get('/admin/cliente/getAll');
        return response.data || [];
    } catch (error) {
        console.error('Error fetching all clients:', error);
        return [];
    }
};

const getClientesByCity = async (city) => {
    try {
        const response = await axios.get(`/admin/cliente/getAllClientesByCity?city=${city}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching clients by city:', error);
        return [];
    }
};

export default function CustomerPage() {
    const [city, setCity] = useState('');
    const [clientes, setClientes] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    useEffect(() => {
        const fetchClientes = async () => {
            const data = await getAllClientes();
            setClientes(data);

            if (data.length > 0) {
                const dynamicHeaders = Object.keys(data[0]).map(key => ({
                    key,
                    title: key.charAt(0).toUpperCase() + key.slice(1),
                    className: 'text-gray-500'
                }));
                setHeaders(dynamicHeaders);
            }
        };
        fetchClientes();
    }, []);

    useEffect(() => {
        const handleCitySearch = async () => {
            if (city) {
                const data = await getClientesByCity(city);
                setClientes(data);

                if (data.length > 0) {
                    const dynamicHeaders = Object.keys(data[0]).map(key => ({
                        key,
                        title: key.charAt(0).toUpperCase() + key.slice(1),
                        className: 'text-gray-500'
                    }));                    
                    setHeaders(dynamicHeaders);
                }
            }
        };
        handleCitySearch();
    }, [city]);

    const handleClick = () => {
        setCity(document.querySelector('#city-input').value);
    };

    const handleReset = async () => {
        setCity('');
        const data = await getAllClientes();
        setClientes(data);

        if (data.length > 0) {
            const dynamicHeaders = Object.keys(data[0]).map(key => ({
                key,
                title: key.charAt(0).toUpperCase() + key.slice(1),
                className: 'text-gray-500'
            }));
            setHeaders(dynamicHeaders);
        }
    };

    const handleModal = () => {
        setShowModal(prev => !prev);
    };

    const [formData, setFormData] = useState(
        registerClienteFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };


    registerClienteFields.forEach((field) => field.onChange = handleChange);

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.username = formData.primerNombre + formData.id.slice(-1, 4);
        const payload = formData;
        console.log(payload);
        
        try {
            const URL = '/admin/cliente/newCliente';
            const response = await axios.post(URL, payload);
            if (response.status === 201) {
                Toast.fire({
                    icon: 'success',
                    title: 'Cliente registrado exitosamente!',
                    confirmButtonText: 'OK',
                });
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setEditModalVisible(true);
    };

    const handleViewClick = (customer) => {
        setSelectedCustomer(customer);
        setViewModalVisible(true);
    };

    const handleDeleteClick =  async(customer) => {
        setSelectedCustomer(customer);
        const data = await getAllClientes();
        setClientes(data);
        setConfirmDeleteVisible(true);
    };

    const handleEditSave = async (updatedCustomer) => {
        const payload = updatedCustomer;
        try {
            const response = await axios.put(url, payload)
            if (response.data == 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Cliente actualizado exitosamente!',
                    confirmButtonText: 'OK',
                  });
            }
        } catch (error) {
            
        }
        setEditModalVisible(false);
        console.log('Customer updated:', updatedCustomer);
    };

    const handleDeleteConfirm = () => {
        setConfirmDeleteVisible(false);
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="my-5 text-3xl font-medium">
                <Header pageTitle="Gestión de clientes" />
            </div>
            <Button
                id="create-customer-btn"
                children="Registrar nuevo cliente"
                type="button"
                className="bg-gray-200 rounded-md w-60 px-5 py-3 my-5 duration-300 hover:bg-green-500 font-medium hover:text-white hover:scale-105"
                onClick={handleModal}
            />
            <div className="flex justify-around items-center">
                <div className='flex flex-row gap-2 px-5 py-3 justify-center items-center'>
                    <div className='bg-gray-200 pl-4 gap-2 py-1 rounded-lg flex items-center'>
                        <box-icon name='search-alt'></box-icon>
                        <input
                            id="city-input"
                            className='rounded-lg border-none focus:ring-0 bg-gray-200'
                            type="search"
                            placeholder="Ingresa una ciudad"
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-gray-200 p-3 rounded-lg px-8 duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white"
                        onClick={handleClick}
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-200 p-3 rounded-lg px-8 duration-300 hover:scale-110 hover:bg-red-600 hover:text-white"
                        onClick={handleReset}
                    >
                        Limpiar
                    </button>
                </div>
            </div>
            <div className="table-view bg-gray-200 w-full h-full mt-5">
                <Table
                    headers={headers}
                    notShow={true}
                    data={clientes}
                    onEdit={handleEditClick}
                    onView={handleViewClick}
                    onDelete={handleDeleteClick}
                />
            </div>
            <Modal
                modalTitle="Registrar Cliente"
                handleSubmit={handleSubmit}
                fields={registerClienteFields}
                dropdownFields={[]}
                show={showModal}
                handleModal={handleModal}
            />
            <ModalEditar
                objecto={selectedCustomer} 
                show={editModalVisible} 
                onClose={() => setEditModalVisible(false)}
                onSave={handleEditSave} 
                entidad={"Producto"}
            />
            <InformacionCliente
                customer={selectedCustomer}
                show={viewModalVisible}
                handleModal={() => setViewModalVisible(false)}
            />
            <EliminarCliente
                customer={selectedCustomer}
                show={confirmDeleteVisible}
                handleModal={() => setConfirmDeleteVisible(false)}
                handleConfirm={handleDeleteConfirm}
            />
        </div>
    );
}
