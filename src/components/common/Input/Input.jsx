import React from 'react'

export default function Input({ text, placeholder, name, id, minLength, maxLength, required, autoComplete, className, labelText, LabelClassName, onChange }) {
  return (
    <>
      <div>
        <label htmlFor={id} className={LabelClassName}>{labelText}</label>
        <div className='mt-2'>
          <input type={text} placeholder={placeholder} name={name} id={id} minLength={minLength} maxLength={maxLength} className={className} required autoComplete={autoComplete} onChange={onChange} />
        </div>
      </div>
    </>
  )
}

