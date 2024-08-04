import React from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';



export default function Form({ formFields, buttonText, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (      
        <Input
          key={field.id}
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
          onChange={field.onChange}
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
