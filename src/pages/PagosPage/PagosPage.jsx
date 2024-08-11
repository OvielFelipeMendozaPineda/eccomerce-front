import React, { useEffect, useState } from 'react'
import Table from '../../components/common/Table/Table'
import axios from '../../utils/axios/ConfigAxios'
import Swal from 'sweetalert2';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import EditarPago from './Modales/EditarPago';

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});


const mockPagos = [
  { id: 1, formaPagoId: 1, terceroId: 1, fechaPago: '2024-08-10' }
]

const mockMetodosPago = [
  { id: 1, nombre: 'Efectivo' },
  { id: 2, nombre: 'Tarjeta' },
  { id: 3, nombre: 'Transeferencia' },
  { id: 4, nombre: 'Bono' }
]

export default function PagosPage() {
  const [state, setState] = useState({
    pagos: mockPagos,
    headers: [],
    metodosPago: [],
    metodoPago: '',
    editViewVisible: false,
    deleteViewVisible: false,
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
        const [pagosRes, formaPagoRes] = await Promise.all([
          axios.get('/admin/pagos/getAll'),
          axios.get('/admin/formaPago/getAll')
        ]);
        setState((prevData) => ({
          ...prevData,
          pagos: pagosRes.data.length > 0 ? pagosRes.data : mockPagos,
          metodosPago: formaPagoRes.data.length > 0 ? formaPagoRes.data : mockMetodosPago
        }));
      } catch (error) {
        console.warn(error);
        setState((prevData) => ({
          ...prevData,
          pagos: mockPagos,
          metodosPago: mockMetodosPago
        }));
      }
    };

    fetchData();
    loadHeaders(state.pagos)
  }, []);

  useEffect(() => {
    if (state.metodoPago == '') {
      return
    }
    const fetchData = async () => {
      console.log(state.metodoPago);
      try {
        const response = await axios.get(`/admin/pagos/getByformaPago?id=${state.metodoPago}`)
        if (response.state === 200) {
          setState((prevData) => ({ ...prevData, pagos: response.data }))
        } else {
          Toast.fire({
            title: 'Error',
            text: `No se pudo obtener pagos por ${state.metodoPago}`,
            timer: 2000
          })
        }
      } catch (error) {
        Toast.fire({
          icon: 'error',
          text: `No se pudo obtener los pagos`,
          timer: 2000
        })
      }
    }
    fetchData()
  }, [state.metodoPago])


  const handleSelectorChange = (e) => {
    const { value } = e.target
    setState((prevData) => ({ ...prevData, metodoPago: value }))
    console.log(state.metodoPago);


  }

  const handleEditView = () => {
    setState((prevData) => ({ ...prevData, editViewVisible: true }))
  }

  const handleEditSave = async () => {
    setState((prevData) => ({ ...prevData, editViewVisible: false }))
    console.log('enviar actualizado');

  }

  return (
    <>
      <div className='flex flex-col w-full gap-5 h-screen'>
        <div className='border-b-2 py-5'><h2 className='text-3xl'>Gestión de pagos</h2></div>
        <div className='w-full'>
          <div className=' flex items-center gap-10'>
            <label className='text-gray-700'> Filtar por metodo de pago:</label>
            <select onChange={handleSelectorChange} className='rounded-lg focus:ring-0 ring-0 border-none '>
              <option value={'getAll'} disabled> Seleccionar forma de pago</option>
              {state.metodosPago.map((metodo) => (
                <option value={metodo.id}> {metodo.nombre} </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <Table
            // data={state.pagos}
            data={mockPagos}
            headers={state.headers}
            notShow={false}
            showPayButton={false}
            onEdit={handleEditView}
          />
        </div>
      </div>
      <EditarPago 
      handleSubmit={handleEditSave} 
      show={state.editViewVisible} 
      onClose={() => setState((prevData) => ({ ...prevData, editViewVisible: false }))} 
      metodosPago={state.metodosPago}
      />
    </>
  )
}
