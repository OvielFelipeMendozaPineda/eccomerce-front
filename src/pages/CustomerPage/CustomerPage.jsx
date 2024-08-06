import React from 'react'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import Button from '../../components/common/Button/Button'
import Header from '../../components/common/Header/Header'
import Table from '../../components/common/Table/Table'
import { useState, useEffect } from 'react'
import axios from 'axios'



const getClientesByCity = async (city) => {
    try {
        const response = await axios.get("/ciudades/getAll")
        if (response.data) {
            return response.data
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}

const defaultHeader = [
    {title: 'Documento', className: 'text-gray-500'},
    {title: 'Nombre ', className: 'text-gray-500'},
    {title: 'Cupo', className: 'text-gray-500'}
]

const SortByCityHeader = [
    {title: 'Documento', className: 'text-gray-500'},
    {title: 'Nombre ', className: 'text-gray-500'},
    {title: 'Ciudad', className: 'text-gray-500'}
]



export default function CustomerPage() {

    const [city, setCity] = useState("")
    const [clientes, setClientes] = useState([])
    const [headers, setHeaders] = useState(defaultHeader)


    useEffect(() => {
        const fetchClientes = async () => {
            if (city) {
                const data = await getClientesByCity(city)
                setClientes(data)
                setHeaders(SortByCityHeader)
                
            }
        }
        fetchClientes()

    }, [city])

    const handleClick = (e) => {
        const cityInput = document.querySelector('#city-input')
        setCity(cityInput.value)
    }
    const handleReset = () => {
        // AQUI VA TODO EL ESTADO INICIAL   
        setHeaders(defaultHeader)
        setCity(null)
    }

    return (
        <div className='flex flex-col w-full h-screen '>
            <div className='my-5 text-3xl font-medium'><Header pageTitle={"Gestion de clientes"} /></div>
            <Button id="create-customer-btn" children="Registrar nuevo cliente" type="button" className="bg-gray-200 rounded-md  w-60 px-5 py-3 hover:bg-green-500 font-bold hover:text-white" ></Button>
            <div className='flex justify-around items-center'>
                <label for="cars">Buscar clientes por ciudad</label>
                <input id='city-input' type="search" name='city-input' placeholder='ingresa una ciudad' />
                <button type="button" className='  bg-gray-200 p-3' onClick={handleClick}> Buscar</button>
                <button type='button' className='  bg-gray-200 p-3' onClick={handleReset}> Limpiar </button>
            </div>
            <div className=' table-view bg-gray-200 w-full h-full mt-5'>
                <Table data={clientes} headers={headers} notShow={false} />
            </div>
        </div>
    )
}
