import React from 'react'

export default function EditarPago({ show, onClose, handleSubmit, pago, metodosPago }) {
    if (!show) {
        return null
    }
    return (
        <div className="absolute w-full h-full inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl p-8 flex flex-col gap-6 w-96">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Modificar pago</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                        <box-icon name="x-circle" ></box-icon>
                    </button>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium" htmlFor="campo1"> Forma de pago </label>
                        <select name="" id="">
                            {metodosPago.map((metodo) => (
                                <option value={metodo.id}>{metodo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium" htmlFor="campo1"> Fecha del pago </label>
                        <input type="date"  />
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none">
                        Cancelar
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 focus:outline-none">
                        Guardar
                    </button>
                </div>
            </div>
        </div>

    )
}
