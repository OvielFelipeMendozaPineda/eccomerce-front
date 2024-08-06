import React from 'react'

export default function Banner() {
    return (
        <div>
            <section
                className="relative bg-[url(https://moufflet.co/wp-content/uploads/2020/09/home5.jpg)] bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-left">
                            Moufflet

                            <strong className="block font-extrabold text-primary-golden text-left"> Pasteleria Gourmet. </strong>
                        </h1>

                        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-left">
                        Moufflet ofrece productos de repostería gourmet, tortas, postres y bocados de sal preparados con los mejores ingredientes del mercado.
                        </p>

                        
                    </div>
                </div>
            </section>
        </div>
    )
}
