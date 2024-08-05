import React from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button';
import Dropdown from '../Input/Dropdown';



export default function Form({ formFields, buttonText, handleSubmit, dropdownFields }) {
  
  console.log(dropdownFields);
  
  
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field) => (      
        <Input
          key={field.id}
          name={field.name}
          placeholder={field.placeholder}
          id={field.id}
          text={field.type}
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
      {dropdownFields.map((dropdown) => (
        <Dropdown id={dropdown.id} labelText={dropdown.labelText} optionsFiled={dropdown.optionsFields} key={dropdown.id}/>
      ))}
      <Button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 mt-8 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
      >
        {buttonText}
      </Button>
    </form>
  )
}
