import React, { useState, useEffect, useCallback } from 'react';
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

export default function CustomerPage() {
    const [city, setCity] = useState('');
    const [clientes, setClientes] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [viewModalVisible, setViewModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

    const fetchClientes = useCallback(async () => {
        try {
            const endpoint = city ? `/admin/cliente/getAllClientesByCity?city=${city}` : '/admin/cliente/getAll';
            const { data } = await axios.get(endpoint);
            setClientes(data);

            if (data.length > 0) {
                setHeaders(Object.keys(data[0]).map(key => ({
                    key,
                    title: key.charAt(0).toUpperCase() + key.slice(1),
                    className: 'text-gray-500'
                })));
            }
        } catch (error) {
            handleErrors(error);
        }
    }, [city]);

    useEffect(() => {
        fetchClientes();

    }, [fetchClientes]);

    const toggleModal = () => setShowModal(!showModal);
    const resetCity = () => setCity('');
    const updateCity = () => setCity(document.querySelector('#city-input').value);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const [formData, setFormData] = useState(registerClienteFields.reduce(
        (acc, field) => ({ ...acc, [field.name]: '' }), {}
    ));

    registerClienteFields.forEach(field => field.onChange = handleChange);

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.username = formData.primerNombre + formData.id.slice(-1, 4);

        try {
            const response = await axios.post('/admin/cliente/newCliente', formData);
            if (response.status === 201) {
                Toast.fire({ icon: 'success', title: 'Cliente registrado exitosamente!' });
                fetchClientes();
                setShowModal(false)
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

    const handleDeleteClick = (customer) => {
        setSelectedCustomer(customer);
        setConfirmDeleteVisible(true);
    };

    const handleEditSave = async (updatedCustomer) => {
        try {
            const response = await axios.put(`/admin/cliente/update/${updatedCustomer.id}`, updatedCustomer);
            console.log(response);

            if (response.status === 200) {
                Toast.fire({ icon: 'success', title: 'Cliente actualizado exitosamente!' });
                fetchClientes();
            }
        } catch (error) {
            handleErrors(error);
        }
        setEditModalVisible(false);
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
                onClick={toggleModal}
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
                        onClick={updateCity}
                    >
                        Buscar
                    </button>
                    <button
                        type="button"
                        className="bg-gray-200 p-3 rounded-lg px-8 duration-300 hover:scale-110 hover:bg-red-600 hover:text-white"
                        onClick={resetCity}
                    >
                        Limpiar
                    </button>
                </div>
            </div>
            <div className="table-view bg-gray-200 w-full h-full mt-5">
                <Table
                    headers={headers}
                    notShow={false}
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
                handleModal={toggleModal}
            />
            <ModalEditar
                objecto={selectedCustomer}
                show={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                onSave={handleEditSave}
                entidad={"Cliente"}
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
                fetchClientes={fetchClientes}
            />
        </div>
    );
}
