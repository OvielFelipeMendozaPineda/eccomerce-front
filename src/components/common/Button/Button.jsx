import React from 'react'
import propTypes from 'prop-types'

export default function Button({children, className, type, onClick, id }) {
  return (
    <button type={type} className={className} onClick={onClick} id={id}>
      {children}
    </button>
  )
}

Button.propTypes = {
    children: propTypes.string,
    className: propTypes.string,
    onclick: propTypes.func,
    type: propTypes.oneOf(['button', 'submit', 'reset']),
    id: propTypes.string
}
