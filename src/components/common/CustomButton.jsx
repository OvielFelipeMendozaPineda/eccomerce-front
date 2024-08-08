import React from 'react'

export default function CustomButton({ children, onClick, className, type = 'button', buttonText }) {
    return (
        <button type={type} className={className} onClick={onClick} >
            {buttonText}
        </button>
    )
}
