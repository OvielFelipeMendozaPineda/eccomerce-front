import React from 'react'
import Form from '../common/Form/Form';
import { useState } from 'react';
import axios from 'axios';
import { Swal } from "sweetalert2";
import { Navigate, useNavigate } from 'react-router-dom';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';


export default function Prueba() {
    const navigate = useNavigate()
    const formFields = [
        {
            name: 'username',
            placeholder: 'Enter your username',
            id: 'username',
            type: 'text',
            minLength: 4,
            maxLength: 20,
            required: true,
            autoComplete: 'username',
            className: 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
            labelText: 'Username',
            labelClassName: 'block text-sm font-medium leading-6 text-gray-900',
            onChange: null,
        }
    ]

    const [formData, setformData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    )

    const handleChange = (event) => {
        const { name, value } = event.target
        console.log(name);

        console.log(value);

        setformData((prevData) => {
            const newData = { ...prevData, [name]: value }

            return newData
        })
    }
    const updatedFormFields = formFields.map((field) => field.onChange = handleChange)
    console.log(formFields);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = formData;
    
        const URL = 'http://localhost:3000/users';
        try {
            const response = await axios.post(URL, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // Comprobar si el estado de la respuesta indica éxito
            if (response.status === 201) {
                const data = response.data;
                console.log(data);
    
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
    
                // Mostrar mensaje de éxito
                Swal.fire({
                    title: 'Registro exitoso',
                    text: 'Tu cuenta ha sido creada exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
    
                // Navegar a otra página
                navigate('/home');
            } else {
                // Lanzar error si el código de estado no es 201
                throw new Error('Error al enviar el formulario: ' + response.statusText);
            }
        } catch (error) {
            console.log(error);
            handleErrors(error);
            console.error('Error al enviar los datos:', error.message);
        }
    };
    

    return (
        <div>
            <Form formFields={formFields} handleSubmit={handleSubmit} buttonText={"enviar"} />
        </div>
    )
}
