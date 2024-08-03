import React from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';
import { useState } from 'react';


export default function Form({ formFields, buttonText, onSubmit }) {

  const [formData, setFormData] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  )

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(FormData)
  }


  return (
    <form onSubmit={{ onSubmit }}>
      {formFields.map((field) => (-
        <Input
          name={field.name}
          placeholder={field.placeholder}
          id={field.id}
          type={field.type}
          minLength={field.minLength}
          maxLength={field.maxLength}
          required
          autoComplete={field.autoComplete}
          className={field.className}
          labelText={field.labelText}
          labelClassName={field.labelClassName}
          onChange={handleChange}
        />
      ))}
      <Button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {buttonText}
      </Button>
    </form>
  )
}
