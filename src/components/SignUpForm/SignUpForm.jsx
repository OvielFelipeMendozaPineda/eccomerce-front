import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input'; // Asegúrate de que esta ruta sea correcta
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';

export default function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    secondname: '',
    lastnameFirst: '',
    lastnameSecond: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    username: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };
      if (name === 'confirmPassword') {
        checkPassword(newFormData);
      }
      return newFormData;
    });
  };

  const checkPassword = (data) => {
    const passwordMismatch = document.querySelector("#passwordMismatch");
    if (data.confirmPassword !== data.password) {
      passwordMismatch.innerText = "Las contraseñas deben coincidir";
      return true;
    } else {
      passwordMismatch.innerText = "";
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checkPassword(formData)) {
      return;
    }

    const payload = {
      id: formData.id,
      primerNombre: formData.firstname,
      segundoNombre: formData.secondname,
      primerApellido: formData.lastnameFirst,
      segundoApellido: formData.lastnameSecond,
      email: formData.email,
      password: formData.password,
      username: formData.username,
      telefono: formData.phone,
      rolTercero: '',
    };

    const URL = '/auth/register';
    try {
      const response = await axios.post(URL, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Error al enviar el formulario: ' + response.statusText);
      }

      const data = response.data;
      localStorage.setItem('token', data.token);
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Tu cuenta ha sido creada exitosamente!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/home');
    } catch (error) {
      handleErrors(error);
      console.error('Error al enviar los datos:', error.message);
    }
  };

  return (
    <div className="flex min-h-full bg-gray-100 h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="drop-shadow-lg p-5 bg-gray-50 flex  rounded-xl justify-center flex-col items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto  w-72"
            src="https://moufflet.co/wp-content/uploads/2020/08/logohome2.png"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Crea tu cuenta</h2>
          <p></p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-evenly gap-x-5">
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                labelText="Número de documento"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                labelText="Primer nombre"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Input
                id="secondname"
                name="secondname"
                value={formData.secondname}
                onChange={handleChange}
                labelText="Segundo nombre"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="flex flex-row justify-evenly gap-x-5">
              <Input
                id="lastnameFirst"
                name="lastnameFirst"
                value={formData.lastnameFirst}
                onChange={handleChange}
                labelText="Primer apellido"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Input
                id="lastnameSecond"
                name="lastnameSecond"
                value={formData.lastnameSecond}
                onChange={handleChange}
                labelText="Segundo apellido"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className='flex flex-row justify-evenly gap-x-5'>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                labelText="Nombre de usuario"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                labelText="Teléfono"
                required
                className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              labelText="Correo electrónico"
              required
              className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <Input
              id="password"
              name="password"
              text="password"
              value={formData.password}
              onChange={handleChange}
              labelText="Contraseña"
              required
              className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              text="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              labelText="Confirmar contraseña"
              required
              className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="block text-sm font- leading-6 text-red-600" id="passwordMismatch"></p>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                Registrarme
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
