import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
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

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Redirigir al usuario a la URL de autorización
            const authorizationUrl = `http://127.0.0.1:9000/oauth2/authorize?response_type=code&client_id=frontend-app&redirect_uri=http://127.0.0.1:8080/authorized&scope=openid%20profile%20read`;
            window.location.href = authorizationUrl;
            const response = await axios.post('http://127.0.0.1:8080/login', {
                username,
                password,
            });
            localStorage.setItem('token', response.data.token);
            Toast.fire({
                icon: "success",
                title: "Ingreso exitoso!"
            });
            navigate('/home');
        } catch (error) {
            Swal.fire({
                title: 'Ingreso de sesion fallido',
                text: 'Revisa tu correo o nombre de usuario y contraseña',
                icon: 'error',
                confirmButtonText: 'entendido'
            })

            console.error('Error durante el inicio de sesión:', error);

        }
    };

    return (
        <div className="flex min-h-full bg-gray-100 h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className='w-96 bg-gray-50 p-5 border-spacing-x-5 rounded-lg drop-shadow-lg flex flex-col'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión en tu cuenta</h2>
                    <div className='flex justify-center items-center p-5 pt-8 text-3xl text-indigo-700'><i className='bx bxl-google duration-200 hover:scale-125'></i></div>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200">
                                Ingresar
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        No tienes cuenta?
                        <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
