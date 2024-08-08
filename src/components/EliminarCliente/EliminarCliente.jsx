import React, { useEffect, useState } from 'react';
import Button from '../common/Button/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EliminarCliente({ customer, show, handleModal }) {
    const [isVisible, setIsVisible] = useState(show);
    const [formData, setformData] = useState(customer);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsVisible(show);
        if (show) {
            setTimeout(() => setLoading(false), 1000);
        }
    }, [show]);

    if (!isVisible) {
        return null;
    }

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

    const handleClick = () => {
        setIsVisible(false);
        handleModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const URL = `/admin/cliente/deleteCliente?id=${formData.id}`;
            const response = await axios.delete(URL);
            if (response.status === 200) {
                Swal.fire('Success', 'Cliente eliminado con éxito', 'success');
            }
        } catch (error) {
            Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error');
        }
    };

    return (
        <div className="absolute w-full h-full inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-96">
                <div className="header flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Eliminar cliente</h2>
                    <button onClick={handleClick} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center">
                    <p key='p' className="text-gray-600">¿Está seguro de eliminar el cliente?</p>
                </div>
                <div className="flex flex-col gap-2">
                    {loading ? (
                        // Skeleton Loader
                        Object.keys(customer).map((key) => (
                                <div className='bg-gray-200 rounded-lg w-full h-8 animate-pulse'></div>
                        ))
                    ) : (
                        // Real Content
                        Object.entries(customer).map(([key, value]) => (
                                <input type="text" name={key} className='rounded-lg' onChange={handleChange} value={value} disabled />
                        ))
                    )}
                </div>
                <div className="flex justify-end gap-4">
                    <button onClick={handleClick} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none">
                        Cancelar
                    </button>
                    <button  onClick={handleSubmit} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>

    );
}
