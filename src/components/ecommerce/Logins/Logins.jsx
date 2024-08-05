import React from 'react'

export default function Logins() {
    return (
        <div className="sm:flex sm:gap-4">
            <div className="hidden sm:flex">
                <a
                    className="rounded-md text-xl font-header px-5 py-2.5 font-medium text-secundary-golden"
                    href="#"
                >
                    Login
                </a>
            </div>
            <a
                className="rounded-md bg-primary-golden flex justify-center items-center h-1/2  self-center px-5 py-1.5 font-medium text-white"
                href="#"
            >
                Sing Up
            </a>

        </div>
    )
}
