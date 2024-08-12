
import { useState, useEffect } from 'react'
import axios from '../../utils/axios/ConfigAxios'
import Table from '../../components/common/Table/Table'
import { handleErrors } from '../../utils/HandleErrors/HandleErrors'
import { ModalEditar } from '../../components/ModalEditar/ModalEditar'
import Swal from 'sweetalert2'

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

const rolesArr = [
  'EMPLEADO', 'CAJERO', 'GERENTE', 'ADMINISTRADOR', 'SUPERVISOR', 'VENDEDOR'
]
const mockOficinas = [
  { id: 1, nombre: 'Exito La Rosita' },
  { id: 2, nombre: 'Exito Cacique C.C.' },
  { id: 3, nombre: 'Exito Cañaveral C.C.' },
]

const mockEmpleados = [
  { id: 1, firstName: 'Felipe', lastName: 'Mendoza', email: 'oviel@gmail.com', telefono: 3165880800, oficina: 1, rol: 1, puesto: 'No se...por ahi', jefe: 1 },

]



export default function EmpleadosPage() {
  const [vistaCrearEmpleado, setVistaCrearEmpleado] = useState(false)
  const [roles, setroles] = useState([])
  const [terceros, setTerceros] = useState([])
  const [oficinas, setOficinas] = useState(mockOficinas)
  const [empleados, setEmpleados] = useState([])
  const [headers, setHeaders] = useState([])
  const [tableUpdate, setTableUpdate] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [EditModalVisible, setEditModalVisible] = useState(false)
  const [ViewModalVisible, setViewModalVisible] = useState(false)
  const [ConfirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [oficinaState, setOficinaState] = useState("Seleccionar Oficina")
  const [empleadosLoaded, setEmpleadosLoaded] = useState(false)

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
    const fetchData = async () => {
      try {
        const [oficinasRes, empleadosRes] = await Promise.all(
          [
            axios.get('/admin/oficinas/getAll'),
            axios.get('/admin/empleados/getAll')
          ]
        )
        setOficinas(oficinasRes.data)
        setEmpleados(empleadosRes.data)
        setroles(rolesArr)

      } catch (error) {
        handleErrors(error)
      }
    }
    fetchData()
  }, [])







  const handleEditClick = (employee) => {

    setSelectedEmployee(employee);
    setEditModalVisible(true);
  };

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (employee) => {


    setSelectedEmployee(employee);
    setConfirmDeleteVisible(true);

  };

  const handleDeleteConfirm = async (employee) => {

    try {
      const url = `/admin/empleados/borrar?id=${employee.id}`
      const response = await axios.delete(url)
      setEmpleados(response.data);
      setTableUpdate(true)
      setConfirmDeleteVisible(false)

    } catch (error) {
      handleErrors(error)
    }

  }
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    telefono: '',
    puesto: '',
    rol_id: '',
    oficina_id: '',
    jefe_id: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      id: formData.id,
      primerNombre: formData.first_name,
      primerApellido: formData.last_name,
      email: formData.email,
      telefono: formData.telefono,
      puesto: formData.puesto,
      rol: formData.rol_id,
      oficina: formData.oficina_id,
      jefe: formData.jefe_id
    }
    try {
      const url = '/admin/empleados/crear'

      const response = await axios.post(url, payload)
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Empleado registrado exitosamente!',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      handleErrors(error)
    }


  }

  const handleEditSave = async (updatedEmployee) => {
    console.log(updatedEmployee);

    const url = `/admin/empleados/update/${updatedEmployee.id}`
    const payload = {
      id: updatedEmployee.id,
      primerNombre: updatedEmployee.primerNombre,
      primerApellido: updatedEmployee.primerApellido,
      email: updatedEmployee.email,
      telefono: updatedEmployee.telefono,
      rol: updatedEmployee.rol,
      oficinaNombre: updatedEmployee.oficinaNombre,
      oficina: updatedEmployee.oficina,
      jefe: updatedEmployee.jefe
    };
    console.log(payload);

    try {
      const response = await axios.put(url, payload)
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Empleado actualizado exitosamente!',
          confirmButtonText: 'OK',
        });
      }

    } catch (error) {
      handleErrors(error)
    }
    setEditModalVisible(false);

  };


  useEffect(() => {
    const fetchEmpleadosData = async () => {
      let empleadosData = []
      console.log(oficinaState);

      try {
        if (oficinaState === 'Seleccionar Oficina') {

          empleadosData = await axios.get('/admin/empleados/getAll')
          console.log(empleadosData, "if");
        } else {
          empleadosData = await axios.get(`/admin/empleados/buscarPorOficina?oficina=${oficinaState}`)
          console.log(empleadosData, "else");
        }
        setEmpleados(empleadosData.data)
        setEmpleadosLoaded(true)
      } catch (error) {
        handleErrors(error)
      }
    }
    fetchEmpleadosData()
  }, [oficinaState])

  useEffect(() => {
    if (!empleadosLoaded) return;

    if (empleados.length === 0) {
      setHeaders([]);
      return;
    }
    const dynamicHeaders = Object.keys(empleados[0]).map((key) => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      className: 'text-gray-500'
    }));
    setHeaders(dynamicHeaders);
  }, [empleados, empleadosLoaded]);

  const handleStatusSelectorChange = (e) => {
    setOficinaState(e.target.value)
  }

  return (
    <>
      <div className='flex flex-col w-full gap-10 h-screen'>
        <div><h2 className='text-2xl'>Gestión de Empleados</h2></div>
        <div className='w-full flex justify-around'>
          <div className='flex items-center gap-5 justify-between'>
            <label className='text-black-500 '>Filtrar por oficina:</label>
            <select className='rounded-lg ring-0 focus:ring-0' onChange={handleStatusSelectorChange}>
              <option value="Seleccionar Oficina">Seleccionar oficina</option>
              {Array.isArray(oficinas) && oficinas.length > 0 && oficinas.map((oficina) => (
                <option value={oficina.nombre}> {oficina.nombre} </option>
              ))}
            </select>
          </div>
          <button onClick={() => setVistaCrearEmpleado(true)} className='bg-blue-900 text-white px-6 py-2 text-bold rounded-lg duration-300 hover:scale-105 hover:text-white hover:bg-green-500'>Registrar nuevo empleados</button>
        </div>
        <div className="table-view bg-gray-200 w-full h-full mt-5">
          <Table
            data={empleados}
            headers={headers}
            notShow={false}
            onEdit={handleEditClick}
            onView={handleViewClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      <CrearNuevoEmpleado
        empleados={empleados}
        handleSubmit={handleSubmit}
        oficinas={oficinas}
        roles={roles}
        onClose={() => setVistaCrearEmpleado(false)}
        show={vistaCrearEmpleado}
        handleChange={handleChange} />
      <ModalEditar
        entidad={'Empleado'}
        objecto={selectedEmployee}
        onClose={() => setEditModalVisible(false)}
        show={EditModalVisible}
        onSave={handleEditSave} />

      <VerEmpleado
        show={ViewModalVisible}
        onClose={() => setViewModalVisible(false)}
        empleado={selectedEmployee}
      />
      <EliminarEmpleado
        show={ConfirmDeleteVisible}
        onClose={() => setConfirmDeleteVisible(false)}
        handleClick={handleDeleteConfirm}
        empleado={selectedEmployee}
      />
    </>
  )
}

function CrearNuevoEmpleado({ show, onClose, roles, oficinas, empleados, handleSubmit, handleChange }) {
  if (!show) return null
  return (
    <>
      <div className="modal absolute inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center animate-fade-in">
        <div className="bg-white p-6 rounded-xl fle shadow-lg max-w-sm w-full">
          <div className='heademy-5 r flex justify-between mb-10'>
            <h2> Registrar nuevo empleado </h2>
            <button onClick={onClose}><box-icon className='text-my-5 4xl flex justify-center items-center' name='x-circle'></box-icon></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Identificación</label>
              <input onChange={handleChange} required type="text" name='id' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Primer nombre</label>
              <input onChange={handleChange} required type="text" name='first_name' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Primer apellido</label>
              <input onChange={handleChange} required type="text" name='last_name' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Correo electronico </label>
              <input onChange={handleChange} required type="email" name='email' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Telefono </label>
              <input onChange={handleChange} required type="number" name='telefono' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor="">  Puesto </label>
              <input onChange={handleChange} type="text" name='puesto' />
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Rol </label>
              <select onChange={handleChange} name="rol_id" id="rol">
                <option value="" > Seleccionar rol</option>
                {roles.map((rol) => (
                  <option value={rol}> {rol} </option>
                ))}
              </select>
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Oficina </label>
              <select onChange={handleChange} name="oficina_id" id="oficina">
                <option value="" > Seleccionar oficina</option>
                {Array.isArray(oficinas) && oficinas.length > 0 && oficinas.map((oficina) => (
                  <option value={oficina.id}> {oficina.nombre} </option>
                ))}
              </select>
            </div>
            <div className='flex my-5 justify-between'>
              <label htmlFor=""> Jefe </label>
              <select onChange={handleChange} name="jefe_id" id="jefe">
                <option value=""> Seleccionar jefe</option>
                {empleados.map((empleado) => {
                  if (empleado.id === 1) {
                    return null
                  } else {
                    return <option value={empleado.id}> {empleado.primerNombre} </option>
                  }
                })}

              </select>
            </div>
            <div className='w-full flex justify-center'>
              <button type='submit' className='px-5 py-2 bg-blue-600 rounded-lg hover:scale-105 duration-300 hover:bg-blue-500 text-white'> Registrar empleado</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
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
        {Object.entries(empleado)?.map(([key, value]) => (
          <div className='flex justify-between'>
            <label htmlFor={key}> {key} </label>
            <input type="text" disabled value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}
function EliminarEmpleado({ show, onClose, empleado, handleClick }) {
  if (!show) return null;
  return (
    <div className="absolute w-full h-full inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6 w-96">
        <div className='w-full flex justify-between items-center gap-5'>
          <h2 className='text-xl'>Eliminar empleado</h2>
          <button onClick={onClose} className='flex items-center justify-center'><box-icon name='x-circle'></box-icon></button>
        </div>
        <div className='w-full flex justify-around'>
          <button onClick={onClose} className=' hover:scale-110 duration-300 px-5 py-2 border-2 border-red-500 hover:bg-red-500 hover:text-white'>No</button>
          <button onClick={() => handleClick(empleado)} className=' hover:scale-105 duration-300 px-6 py-3 bg-green-500 hover:bg-green-400 text-white'>Si</button>
        </div>
      </div>
    </div>
  );
}