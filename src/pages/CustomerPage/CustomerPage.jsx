import React, { useState, useEffect } from 'react';
import Button from '../../components/common/Button/Button';
import Header from '../../components/common/Header/Header';
import Table from '../../components/common/Table/Table';
import axios from 'axios';


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
    const [city, setCity] = useState('');
    const [clientes, setClientes] = useState([]);
    const [headers, setHeaders] = useState([]);

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

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="my-5 text-3xl font-medium">
                <Header pageTitle="Gestion de clientes" />
            </div>
            <Button id="create-customer-btn" children="Registrar nuevo cliente" type="button" className="bg-gray-200 rounded-md w-60 px-5 py-3 hover:bg-green-500 font-bold hover:text-white" />
            <div className="flex justify-around items-center">
                <label htmlFor="city-input">Buscar clientes por ciudad</label>
                <input id="city-input" type="search" name="city-input" placeholder="Ingresa una ciudad" />
                <button type="button" className="bg-gray-200 p-3" onClick={handleClick}>Buscar</button>
                <button type="button" className="bg-gray-200 p-3" onClick={handleReset}>Limpiar</button>
            </div>
            <div className="table-view bg-gray-200 w-full h-full mt-5">
                <Table data={clientes} headers={headers} notShow={false} />
            </div>
        </div>
    );
}
