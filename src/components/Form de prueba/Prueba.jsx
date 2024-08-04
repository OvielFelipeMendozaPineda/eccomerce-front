import React from 'react'
import Form from '../common/Form/Form';
import { useState } from 'react';



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
            onChange: null,
        }
    ]

    const [formData, setformData] = useState(
        formFields.reduce((acc, field) => ({...acc, [field.name]:''}), {})
    )

    const handleChange = (event) => {
        const {name, value} = event.target
        console.log(name);
        
        console.log(value);
        
        setformData((prevData) => {
            const newData = {...prevData, [name]: value}
            
            return newData
        })
    }
    const updatedFormFields = formFields.map((field) => field.onChange = handleChange)
    console.log(formFields);
    

    const handleSubmit = (event) => {
        event.preventDefault()
        const payload = formData
        console.log(payload);
        

    }   

    return (
        <div>
            <Form formFields={formFields} handleSubmit={handleSubmit} buttonText={"enviar"} />
        </div>
    )
}
