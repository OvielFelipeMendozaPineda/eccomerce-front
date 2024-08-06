import React from 'react'
import ButtonSection from './ButtonSection/ButtonSection'

export default function Section() {
    return (
        <div>
            <section className='bg-background-gray'>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                    <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <li>
                            <a href="#" className="group relative block">
                                <img
                                    src="https://moufflet.co/wp-content/uploads/2020/09/lineadulce.jpg  "
                                    alt=""
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                />

                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-3xl font-extrabold pb-8 text-primary-golden">De Dulce</h3>

                                    <ButtonSection text={"Nuestros Brownies"} />
                                </div>
                            </a>
                        </li>

                        <li>
                            <a href="#" className="group relative block">
                                <img
                                    src="https://moufflet.co/wp-content/uploads/2020/09/desal.jpg"
                                    alt=""
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                />

                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-3xl font-extrabold pb-8 text-white">Antojos De Sal</h3>

                                    <ButtonSection text={"Antojate"}/>
                                </div>
                            </a>
                        </li>

                        <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                            
                            <a href="#" className="group relative block">
                                <img
                                    src="https://moufflet.co/wp-content/uploads/2020/12/Captura-de-Pantalla-2020-12-05-a-las-9.08.21-a.-m..png"
                                    alt=""
                                    className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                                />

                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-7xl font-header pb-16 font-extrabold text-white">Nuestros <br />Brownies</h3>

                                    <ButtonSection text={"Pide Lo Tuyo"}/>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
