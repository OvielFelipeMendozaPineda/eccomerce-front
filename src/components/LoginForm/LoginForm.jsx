import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import Form from '../common/Form/Form';
import { type } from '@testing-library/user-event/dist/type';
export default function LoginForm() {

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
    const navigate = useNavigate();
    const formFields = [
        { text: 'text', id: 'username', name: 'username', autoComplete: 'username', labelText: 'Usuario o correo', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 mb-3 w-full ' },
        { type: 'password', id: 'password', name: 'password', autoComplete: 'password', labelText: 'Contraseña', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 w-full ' },

    ]
    const [formData, setformData] = useState(
        formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    )

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformData((prevData) => {
            const newData = { ...prevData, [name]: value }
            return newData
        })
    }

    formFields.map((field) => field.onChange = handleChange)

    const checkAuthorizationUrl = async () => {
        try {
            await axios.get('http://127.0.0.1:8080/auth/login');
            console.log("Check");

            return true;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = formData
        try {
            const URL = 'http://127.0.0.1:8080/auth/login';
            const response = await axios.post(URL, payload);
            localStorage.setItem('token', response.data.token);
            console.log(response.data.token);

            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso'
                });
                navigate('/home');
            }
        } catch (error) {
            handleErrors(error);
        }
    };
    return (
        <div className="flex min-h-full  bg-gray-100 h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className="drop-shadow-lg py-5 px-12 rounded-lg bg-gray-50 flex justify-center flex-col items-center">
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'> <h2 className='mt-10 text-center text-3xl font-bold leading-9 pb-5 tracking-tight text-gray-900'> Ingresa a tu cuenta </h2>
                    <div className='flex justify-center'>
                        <p className='text-gray-900'> Acceder con <b className='text-blue-600 cursor-pointer'>google</b></p>
                    </div>
                </div>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <Form formFields={formFields} handleSubmit={handleSubmit} buttonText='Ingresar' />
                </div>
                <div className='sm:mx-auto sm:w-full mt-5 flex justify-center items-center sm:max-w-sm'>
                    <p>No tienes cuenta?<Link to={"/register"} className='text-blue-600 font-bold px-1 cursor-pointer'>Registrate</Link></p>
                </div>
            </div>
        </div>

    );
}
