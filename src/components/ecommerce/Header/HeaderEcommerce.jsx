import React from 'react'
import Logins from '../Logins/Logins'

export default function header() {
  return (
    <header className="bg-primary-blue">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="block text-teal-600" href="#">
                            <span className="sr-only">Home</span>
                            <div className='w-44 mt-5'>
                              <img src="https://moufflet.co/wp-content/uploads/2020/08/logohome2.png" alt="" />
                            </div>
                            
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-xl font-header">
                                <li>
                                    <a className="text-secundary-golden transition hover:text-secundary-golden/75" href="#"> Inicio </a>
                                </li>

                                <li>
                                    <a className="text-secundary-golden transition hover:text-secundary-golden/75" href="#"> Menu </a>
                                </li>

                                <li>
                                    <a className="text-secundary-golden transition hover:text-secundary-golden/75" href="#"> Bodas </a>
                                </li>

                                <li>
                                    <a className="text-secundary-golden transition hover:text-secundary-golden/75" href="#"> Crea tu evento </a>
                                </li>

                                <li>
                                    <a className="text-secundary-golden transition hover:text-secundary-golden/75" href="#"> Puntos de venta </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4">
                            <Logins></Logins>

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
  )
}
