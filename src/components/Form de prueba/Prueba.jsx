import React from 'react'
import Form from '../common/Form/Form';

export default function Prueba() {
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
            onChange: (e) => console.log(e.target.value),
        },
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
            onChange: (e) => console.log(e.target.value),
        }
    ]
    const handleSubmit = (data) => {
        console.log('aqui se hace el post' + data);
    }
    return (
        <>
            <Form formFields={formFields} onSubmit={handleSubmit} buttonText={"enviar"} />
        </>
    )
}
