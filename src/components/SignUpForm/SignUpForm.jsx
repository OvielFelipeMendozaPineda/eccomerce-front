import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input';
import axios from 'axios';
import Swal from 'sweetalert2'
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';


export default function SignUpForm() {

  const navigate = useNavigate()

  const [formData, setformData] = useState(
    {
      firstname: '',
      secondname: '',
      lastnameFirst: '',
      lastnameSecond: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      username: ''
    }
  )


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    setformData((prevFormData) => {
      const newFormData = { ...prevFormData, [name]: value };

      if (name === 'confirmPassword') {
        console.log(newFormData);
        checkPassword(newFormData);
      }

      return newFormData;
    });
  };

  const checkPassword = (data) => {
    const passwordMissmatched = document.querySelector("#passwordMissmatched")
    if (data.confirmPassword != data.password) {
      passwordMissmatched.innerText = "Las contraseñas deben coincidir"
      return true

    } else {
      passwordMissmatched.innerText = ""
      return false

    }
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    if (checkPassword(formData)) {

    } else {

      const payload = {
        primerNombre: formData.firstname,
        segundoNombre: formData.lastname,
        primerApellido: formData.lastnameFirst,
        segundoApellido: formData.lastnameSecond,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        telefono: formData.phone,
        rolTercero: ''
      }

      const URL = 'http://localhost:3000/users'
      try {
        const response = await axios.post(URL, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status !== 200) {
          throw new Error('Error al enviar el formulario' + response.statusText)
        }
        const data = response.data
        localStorage.setItem('token', data.token)
        Swal.fire({
          title: 'Login Successful',
          text: 'You have successfully logged in!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        navigate('/home')
      } catch (error) {
        handleErrors(error)
        console.error('Error al enviar los datos:', error.message);

      }
    }
  }
  return (
    <div className="flex min-h-full bg-gray-100 h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className=' drop-shadow-lg p-5 bg-gray-50 flex justify-center flex-col items-center'  >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Crea tu cuenta</h2>
          <p> </p>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className='flex flex-row justify-evenly gap-x-5'>
              <div className='w-full'>
                <label htmlFor="firstname" className="block text-sm font- leading-6 text-gray-900">Primer nombre</label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="secondname" className="block text-sm font- leading-6 text-gray-900">Segundo nombre</label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="secondname"
                    name="secondname"
                    value={formData.secondname}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-row justify-evenly gap-x-5'>
              <div className='w-full'>
                <label htmlFor="lastnameFirst" className="block text-sm font- leading-6 text-gray-900">Primer apellido</label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="lastnameFirst"
                    name="lastnameFirst"
                    value={formData.lastnameFirst}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className='w-full'>
                <label htmlFor="lastnameSecond" className="block text-sm font- leading-6 text-gray-900">Segundo apellido</label>
                <div className="mt-2">
                  <input
                    required
                    type="text"
                    id="lastnameSecond"
                    name="lastnameSecond"
                    value={formData.lastnameSecond}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <Input
              required
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              LabelText={'Nombre de usuario'}
              LabelClassName={"block text-sm font- leading-6 text-gray-900"}
            />

            <div>
              <label htmlFor="phone" className="block text-sm font- leading-6 text-gray-900">Telefono</label>
              <div className="mt-2">
                <input
                  required
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font- leading-6 text-gray-900">Correo electrónico</label>
              <div className="mt-2">
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font- leading-6 text-gray-900">Contraseña</label>
              <div className="mt-2">
                <input
                  required
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font- leading-6 text-gray-900">Confirmar contraseña</label>
              <div className="mt-2">
                <input
                  required
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p className='block text-sm font- leading-6 text-red-600' id='passwordMissmatched'> </p>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
