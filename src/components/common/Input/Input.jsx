import React from 'react'

export default function Input({ text, placeholder, name, id, minLength, maxLength, required, autoComplete, className, labelText, LabelClassName, onChange }) {
  return (
    <>
      <div>
        <label htmlFor={id} className="block text-sm font- leading-6 text-gray-900"> {labelText} </label>
        <div className='mt-2'>
          <input type={text} placeholder={placeholder} name={name} id={id} minLength={minLength} maxLength={maxLength} className={className} required autoComplete={autoComplete} onChange={onChange} />
        </div>
      </div>
    </>
  )
}


Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  onChange: PropTypes.func.isRequired
};