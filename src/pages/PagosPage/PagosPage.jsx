import React, { useEffect, useState } from 'react'
import Table from '../../components/common/Table/Table'
import axios from 'axios'
import { wait } from '@testing-library/user-event/dist/utils'


const mockPagos = [
  { id: 1, nombre: 'pago mock', cliente: 'elpa nadero' }
]

export default function PagosPage() {
  const [state, setState] = useState({
    pagos: mockPagos,
    headers: [],
  })

  const loadHeaders = async (data) => {
    const headers = Object.keys(data[0]).map((key) => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      className: 'text-gray-500'
    }))
    setState((prevData) => ({ ...prevData, headers: headers }))
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pagosRes] = await Promise.all([
          axios.get('/admin/pagos/getAl')
        ])
        setState((prevData) => ({ ...prevData, pagos: pagosRes.data }))
      } catch (error) {
        setState((prevData) => ({ ...prevData, pagos: mockPagos }))
      }
    }
    fetchData()
    loadHeaders(state.pagos)
    
  }, [])



  return (
    <div className='flex flex-col w-full gap-5 h-screen'>
      <div className='border-b-2 py-5'><h2 className='text-3xl'>Gestión de pagos</h2></div>
      <div className='w-full'>
        <div className=' flex items-center gap-10'>
          <label className='text-gray-700'> Filtar por metodo de pago:</label>
          <select className='rounded-lg focus:ring-0 ring-0 border-none '></select>
        </div>
      </div>
      <div>
        <Table
          // data={state.pagos}
          data={mockPagos}
          headers={state.headers}
          notShow={false}
          showPayButton={false}

        />
      </div>
    </div>
  )
}
