import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import Header from '../../components/common/Header/Header';
import Table from '../../components/common/Table/Table';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { registerClienteFields } from '../../utils/inputs/product/product';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import axios from '../../utils/axios/ConfigAxios';
import { useAuth } from '../../utils/Authorized';
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

const getClientesByCity = async (city) => {
    try {
        const response = await axios.get(`/admin/cliente/getAllClientesByCity?city=${city}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching clients by city:', error);
        return [];
    }
};


const getAllClientes = async () => {
    try {
        const response = await axios.get(`/admin/cliente/getAll`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching all clients:', error);
        return [];
    }
};

export default function CustomerPage() {
    const { login } = useAuth();
    const [city, setCity] = useState('');
    const [clientes, setClientes] = useState([]);
    const [headers, setHeaders] = useState([]);
    const navigate = useNavigate();

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

    // Actualiza la ciudad cuando se hace clic en el botón de búsqueda
    const handleClick = () => {
        const cityInput = document.querySelector('#city-input');
        setCity(cityInput.value);
    };

    // Resetea el estado al valor inicial
    const handleReset = () => {
        setCity('');
        (async () => {
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
        })();
    };

    const [showModal, setshowModal] = useState(false)
    const handleModal = (e) => {
        if (!showModal) {
            console.log("true");

            setshowModal(true)
        } else {
            console.log("false");

            setshowModal(false)
        }
    }
    const [formData, setformData] = useState(
        registerClienteFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({ ...prevData, [name]: value }));
    };

    registerClienteFields.forEach((field) => field.onChange = handleChange);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = formData;
        try {
            const URL = '/auth/register';
            const response = await axios.post(URL, payload);
            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Cliente registrado exitosamente!'
                });
            }
        } catch (error) {
            console.log("Hola");

            handleErrors(error);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="my-5 text-3xl font-medium">
                <Header pageTitle="Gestion de clientes" />
            </div>
            <Button id="create-customer-btn" children="Registrar nuevo cliente" type="button" className="bg-gray-200 rounded-md w-60 px-5 py-3 my-5  duration-300 hover:bg-green-500 font-medium hover:text-white hover:scale-105" onClick={handleModal} />
            <div className="flex justify-around items-center">
                <div className='flex flex-row gap-2  px-5 py-3 justify-center items-center'>
                    <div className='bg-gray-200 pl-4 gap-2 py-1 rounded-lg flex items-center'>
                        <box-icon name='search-alt'></box-icon>
                        <input id="city-input" className=' rounded-lg border-none  focus:ring-0 ring-0 bg-gray-200 ' type="search" name="city-input" placeholder="Ingresa una ciudad" />
                    </div>
                    <button type="button" className="bg-gray-200 p-3 rounded-lg px-8 duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white" onClick={handleClick}>Buscar</button>
                    <button type="button" className="bg-gray-200 p-3 rounded-lg px-8 duration-300 hover:scale-110 hover:bg-red-600 hover:text-white" onClick={handleReset}>Limpiar</button>
                    <Button id="create-customer-btn" children="Registrar nuevo cliente" type="button" className="bg-gray-200 rounded-md w-60 px-5 py-3 my-5  duration-300 hover:bg-green-500 font-medium hover:text-white hover:scale-105" onClick={handleModal} />
                </div>

            </div>
            <div className="table-view bg-gray-200 w-full h-full mt-5">
                <Table data={clientes} headers={headers} notShow={false} />
            </div>
            <Modal modalTitle="Registrar Cliente" handleSubmit={handleSubmit} fields={registerClienteFields} dropdownFields={[]} show={showModal} handleModal={handleModal} />
        </div>
    );
}

// /admin/cliente/newCliente
// admin/cliente/delete?id=ceduladelvago