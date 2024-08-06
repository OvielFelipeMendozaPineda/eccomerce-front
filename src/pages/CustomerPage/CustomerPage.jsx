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
        const response = await axios.get(`clientes/getAllClientesByCity?city=${city}`);
        return response.data || [];
    } catch (error) {
        console.error('Error fetching clients by city:', error);
        return [];
    }
};


const getAllClientes = async () => {
    try {
        const response = await axios.get(`clientes/getAllClientes`);
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

    // Maneja la búsqueda de clientes por ciudad
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
            const URL = '/admin/cliente/newCliente';
            const response = await axios.post(URL, payload);

            if (response.status === 200) {
                login(response.data.token);
                Toast.fire({
                    icon: 'success',
                    title: 'Cliente registrado exitosamente!'
                });
            }
        } catch (error) {
            handleErrors(error);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="my-5 text-3xl font-medium">
                <Header pageTitle="Gestion de clientes" />
            </div>
            <Button id="create-customer-btn" children="Registrar nuevo cliente" type="button" className="bg-gray-200 rounded-md w-60 px-5 py-3 hover:bg-green-500 font-bold hover:text-white" onClick={handleModal} />
            <div className="flex justify-around items-center">
                <label htmlFor="city-input">Buscar clientes por ciudad</label>
                <input id="city-input" type="search" name="city-input" placeholder="Ingresa una ciudad" />
                <button type="button" className="bg-gray-200 p-3" onClick={handleClick}>Buscar</button>
                <button type="button" className="bg-gray-200 p-3" onClick={handleReset}>Limpiar</button>
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