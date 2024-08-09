
import { useState, useEffect } from 'react'
import axios from '../../utils/axios/ConfigAxios'
import Table from '../../components/common/Table/Table'

const mockRoles = [
  { id: 1, rol: 'Gerente' },
  { id: 2, rol: 'Cajero' },
  { id: 3, rol: 'Conductor' },
]
const getAllRoles = async () => {
  try {
    const url = 'admin/rol/getAll'
    const response = await axios.get(url)
    if (response.data == 200) {
      return response.data
    }
    return []
  } catch (error) {
    return []
  }
}

const mockOficinas = [
  { id: 1, nombre: 'Exito La Rosita' },
  { id: 2, nombre: 'Exito Cacique C.C.' },
  { id: 3, nombre: 'Exito Cañaveral C.C.' },
]
const getAllOficinas = async () => {
  try {
    const url = '/admin/oficina/getAll'
    const response = await axios.get(url)
    if (response.data == 200) {
      return response.data
    }
    return []
  } catch (error) {
    return []
  }
}
const mockEmpleados = [
  { id: 1, firstName: 'Felipe', lastName: 'Mendoza', oficina: 1, rol: 1, puesto: 'No se...por ahi' },
  { id: 1, firstName: 'Felipe', lastName: 'Mendoza', oficina: 1, rol: 1, puesto: 'No se...por ahi' },
  { id: 1, firstName: 'Felipe', lastName: 'Mendoza', oficina: 1, rol: 1, puesto: 'No se...por ahi' },
  { id: 1, firstName: 'Felipe', lastName: 'Mendoza', oficina: 1, rol: 1, puesto: 'No se...por ahi' }
]
const getAllEmpleados = async () => {
  try {
    const url = '/admin/empleado/getAll'
    const response = await axios.get(url)
    if (response.data == 200) {
      return response.data
    }
    return []
  } catch (error) {
    return []
  }
}


export default function EmpleadosPage() {
  const [vistaCrearEmpleado, setVistaCrearEmpleado] = useState(false)
  const [roles, setroles] = useState([])
  const [oficinas, setoficinas] = useState([])
  const [empleados, setempleados] = useState([])
  const [headers, setHeaders] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [EditModalVisible, setEditModalVisible] = useState(false)
  const [ViewModalVisible, setViewModalVisible] = useState(false)
  const [ConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false)

  const loadDynamicHeader = async (data) => {
    if (data.length > 0) {
      const dynamicHeaders = Object.keys(data[0]).map(key => ({
        key,
        title: key.charAt(0).toUpperCase() + key.slice(1),
        className: 'text-gray-500'
      }));
      setHeaders(dynamicHeaders);
    }
  }

  useEffect(() => {
    setempleados(mockEmpleados)
    setoficinas(mockOficinas)
    setroles(mockRoles)
    loadDynamicHeader(mockEmpleados)
  }, [])

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setEditModalVisible(true);
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setViewModalVisible(true);
  };

  const handleDeleteClick = async (employee) => {
    setSelectedEmployee(employee);
    const data = await getAllEmpleados();
    setempleados(data);
    setConfirmDeleteVisible(true);
  };


  return (
    <>
      <div className='flex flex-col w-full gap-5 h-screen'>
        <div><h2 className='text-2xl'>Gestión de Empleados</h2></div>
        <div className='w-full flex justify-center'>
          <button onClick={() => setVistaCrearEmpleado(true)} className='bg-gray-300 px-6 py-2 text-bold rounded-lg duration-300 hover:scale-105 hover:text-white hover:bg-green-500'>Registrar nuevo empleados</button>
        </div>
        <div className="table-view bg-gray-200 w-full h-full mt-5">
          <Table
            data={mockEmpleados}
            headers={headers}
            notShow={false}
            onEdit={handleEditClick}
            onView={handleViewClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      <CrearNuevoEmpleado empleados={empleados} oficinas={oficinas} roles={roles} onClose={() => setVistaCrearEmpleado(false)} show={vistaCrearEmpleado} />
      <EditarEmpleado show={EditModalVisible} onClose={() => setEditModalVisible(false)} />
      <VerEmpleado show={ViewModalVisible} onClose={() => setViewModalVisible(false)} />
      <EliminarEmpleado show={ConfirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} />
    </>
  )
}



function CrearNuevoEmpleado({ show, onClose, roles, oficinas, empleados }) {
  if (!show) return null
  return (
    <>
      <div className="modal absolute inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center animate-fade-in">
        <div className="bg-white p-6 rounded-xl fle shadow-lg max-w-sm w-full">
          <div className='heademy-5 r flex justify-between mb-10'>
            <h2> Registrar nuevo empleado </h2>
            <button onClick={onClose}><box-icon className='text-my-5 4xl flex justify-center items-center' name='x-circle'></box-icon></button>
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Primer nombre</label>
            <input type="text" name='first_name' />
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Primer apelldio</label>
            <input type="text" name='last_name' />
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Correo electronico </label>
            <input type="text" name='email' />
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor="">  Puesto </label>
            <input type="text" name='puesto' />
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Rol </label>
            <select name="rol_id" id="rol">
              <option value="" disabled> Seleccionar rol</option>
              {roles.map((rol) => (
                <option value={rol.id}> {rol.rol} </option>
              ))}
            </select>
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Oficna </label>
            <select name="oficna_id" id="oficna">
              <option value="" disabled> Seleccionar oficna</option>
              {oficinas.map((oficina) => (
                <option value={oficina.id}> {oficina.nombre} </option>
              ))}
            </select>
          </div>
          <div className='flex my-5 justify-between'>
            <label htmlFor=""> Jefe </label>
            <select name="jefe_id" id="jefe">
              <option value="" disabled> Seleccionar jefe</option>
              {empleados.map((empleado) => (
                <option value={empleado.id}> {empleado.firstName} </option>
              ))}

            </select>
          </div>
          <div className='w-full flex justify-center'>
            <button className='px-5 py-2 bg-blue-600 rounded-lg hover:scale-105 duration-300 hover:bg-blue-500 text-white'> Registrar empleado</button>
          </div>
        </div>
      </div>
    </>
  )
}
function EditarEmpleado({ show, onClose, empleado }) {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-96">
        <div className='w-full flex justify-between items-center gap-5'>
          <h2>Informacion del empleado</h2>
          <button onClick={onClose} className='flex items-center justify-center'><box-icon name='x-circle'></box-icon></button>
        </div>
      </div>
    </div>
  );
}
function VerEmpleado({ show, onClose, empleado }) {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-96">
        <div className='w-full flex justify-between items-center gap-5'>
          <h2>Editar empleado</h2>
          <button onClick={onClose} className='flex items-center justify-center'><box-icon name='x-circle'></box-icon></button>
        </div>
      </div>
    </div>
  );
}

function EliminarEmpleado({ show, onClose, empleado }) {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-96">
        <div className='w-full flex justify-between items-center gap-5'>
          <h2>Eliminar empleado</h2>
          <button onClick={onClose} className='flex items-center justify-center'><box-icon name='x-circle'></box-icon></button>
        </div>
      </div>
    </div>
  );
}