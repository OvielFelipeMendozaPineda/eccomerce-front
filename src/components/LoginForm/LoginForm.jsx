import React from 'react'
import Input from '../common/Input/Input'
import { Link } from 'react-router-dom'

export default function LoginForm() {
    return (
        <div className="flex min-h-full bg-gray-100 h-screen flex-col justify-center items-center px-6 py-12 lg:px-8">
            <div className=' w-96 bg-gray-50 p-5 border-spacing-x-5 rounded-lg drop-shadow-lg flex flex-col '>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión en tu cuenta</h2>

                <div className='flex justify-center items-center p-5 pt-8 text-3xl text-indigo-700  '> <i className='bx bxl-google  duration-200 hover:scale-125'></i></div>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label for="email" className="block text-sm font- leading-6 text-gray-900">Correo electrónico</label>
                        <div className="mt-2">
                            <Input text={"email"} autocomplete={"email"} id={"emailInput"} name={"emailInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block text-sm font-small leading-6 text-gray-900">Contraseña</label>
                        </div>
                        <div className="mt-2">
                            <Input text={"password"} autocomplete={"password"} id={"passwordlInput"} name={"passwordlInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200">Ingresar</button>
                    </div>
                </form>

                <p className="mt-10 text-center  text-sm text-gray-500">
                    No tienes cuenta?
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Registrarse
                    </Link>
                </p>
            </div>
            </div>
        </div>
    )
}
