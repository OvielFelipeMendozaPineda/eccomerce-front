import React from 'react'

export default function Input({text, placeholder, name, id, minLenght, maxLenght, requeired, autocomplete, className}) {
  return (  
    <input type={text} placeholder={placeholder} name={name} id={id} minlenght={minLenght} maxlenght={maxLenght} className={className} required={requeired} autoComplete={autocomplete} />
  )
}
