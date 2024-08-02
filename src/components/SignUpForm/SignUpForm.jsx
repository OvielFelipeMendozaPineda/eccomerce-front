import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../common/Input/Input'


    const handleClick = () => {
        const form = document.querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const formData = Object.fromEntries(new FormData(form))
            console.log(formData);
        })
    }
    handleClick()
export default function SignUpForm() {


    return (
        <div className="flex min-h-full h-screen flex-col justify-center align-middle px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">Crea tu cuenta</h2>
            </div>
            <h2 className="mt-5 text-center  text-3xl text-gray-500">
                <Link to="/SignUp" className="text-gray-600 hover:text-gray-500">
                    <i className='bx bxl-google '></i>
                </Link>
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="" method="POST">

                    <div className='flex flex-row justify-evenly gap-x-5'>
                        <div className='w-full'>
                            <label for="firstname" className="block text-sm font- leading-6 text-gray-900">Primer nombre</label>
                            <div className="mt-2">
                                <Input text={"firstname"} autocomplete={"firstname"} id={"firstnameInput"} name={"firstnameInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                            </div>
                        </div>
                        <div className='w-full'>
                            <label for="secondname" className="block text-sm font- leading-6 text-gray-900">Segundo nombre</label>
                            <div className="mt-2">
                                <Input text={"secondname"} autocomplete={"secondname"} id={"secondnameInput"} name={"secondnameInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5  p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row justify-evenly gap-x-5'>
                        <div className='w-full '>
                            <label for="lastnameFirst" className="block text-sm font- leading-6 text-gray-900">Primer apellido</label>
                            <div className="mt-2">
                                <Input text={"lastnameFirst"} autocomplete={"lastnameFirst"} id={"lastnameFirstInput"} name={"lastnameFirstInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                            </div>
                        </div>
                        <div className='w-full  ' >
                            <label for="lastnameSecond" className="block text-sm font- leading-6 text-gray-900">Segundo apellido</label>
                            <div className="mt-2">
                                <Input text={"lastnameSecond"} autocomplete={"lastnameSecond"} id={"lastnameSecondInput"} name={"lastnameSecondInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="email" className="block text-sm font- leading-6 text-gray-900">Correo electronico</label>
                        <div className="mt-2">
                            <Input text={"email"} autocomplete={"email"} id={"emailInput"} name={"emailInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                        </div>
                    </div>
                    <div>
                        <label for="password" className="block text-sm font- leading-6 text-gray-900">Contreseña</label>
                        <div className="mt-2">
                            <Input text={"password"} autocomplete={"password"} id={"passwordInput"} name={"passwordInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                        </div>
                    </div>
                    <div>
                        <label for="password" className="block text-sm font- leading-6 text-gray-900">Confirmar Contreseña</label>
                        <div className="mt-2">
                            <Input text={"password"} autocomplete={"password"} id={"passwordInput"} name={"passwordInput"} requeired={""} className={"block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Ingresar</button>
                    </div>
                </form>


            </div>
        </div>
    )
}
