import React from 'react'



export default function Dropdown({ optionsFields, name, id, labelText}) {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font- leading-6 text-gray-900' >{labelText}</label>
            <select name={name} id={id}>
                {optionsFields.map((option) => (
                    <option value={option.id}> {option.name} </option>
                ))}
            </select>
        </div>
    )
}


