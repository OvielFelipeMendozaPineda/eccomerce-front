import React from 'react'

export default function ButtonSection({text}) {
    return (
        <div>
            <span
                className="mt-1.5 inline-block bg-primary-golden px-4 py-2 text-s font-header font-bold uppercase tracking-wide text-black"
            >
                {text}
            </span>
        </div>
    )
}
