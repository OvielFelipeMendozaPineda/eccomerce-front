import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import Table from '../../components/common/Table/Table';

export const Toast = Swal.mixin({
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

const mockPedido = [
  {
    fechaPedido: '2024-10-01',
    fechaEsperada: '2024-12-01',
    fechaEntrega: null,
    estado: 'creado',
    comentarios: 'El pedido trae comentarios',
  }
]


const getAllProductos = async () => {
  try {
    const url = '/admin/producto/getAll';
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    return [];
  }
};

const getAllPedidos = async () => {
  try {
    const url = '/admin/pedido/getAll';
    const response = await axios.get(url);
    return mockPedido;
  } catch (error) {
    return mockPedido
  }
};





const getAllPedidosByEstado = async (state) => {
  try {
    const url = `/admin/pedido/getAllByState?estado=${state}`;
    const response = await axios.get(url);
    return response.data || [];
  } catch (error) {
    return [];
  }
};




export default function PedidosPage() {
  const [headers, setHeaders] = useState([]);
  const [newPedidoView, setNewPedidoView] = useState(false);
  const [pedidosEstado, setPedidosEstado] = useState('Activo');
  const [fechaEsperada, setfechaEsperada] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([{ id: '', cantidad: 1 }]);
  const [selectedOrder, setselectedOrder] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = await getAllProductos();
      setProductos(productos);
    };

    fetchProductos();

  }, []);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const pedidosFetch = await getAllPedidos();
        setPedidos(pedidosFetch);
        console.log(pedidosFetch);
    
        if (pedidosFetch) {
          const dynamicHeaders = Object.keys(pedidosFetch[0]).map((key) => ({
            key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            className: 'text-gray-500'
          }));
          console.log(dynamicHeaders);
          setHeaders(dynamicHeaders);
        }
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };
    
    fetchPedidos();

    
  }, [])


  useEffect(() => {
    const fetchPedidosByEstado = async () => {
      const pedidos = await getAllPedidosByEstado(pedidosEstado);
      setProductos(pedidos);
    };
    fetchPedidosByEstado();
  }, [pedidosEstado]);


  const handleSelectChange = (index, event) => {
    const newSelectedProductos = [...selectedProductos];
    newSelectedProductos[index].id = event.target.value;
    setSelectedProductos(newSelectedProductos);
  };

  const handleCantidadChange = (index, event) => {
    const newSelectedProductos = [...selectedProductos];
    newSelectedProductos[index].cantidad = event.target.value;
    setSelectedProductos(newSelectedProductos);
  };

  const agregarProducto = () => {
    setSelectedProductos([...selectedProductos, { id: '', cantidad: 1 }]);
  };

  const eliminarProducto = (index) => {
    const newSelectedProductos = selectedProductos.filter((_, i) => i !== index);
    setSelectedProductos(newSelectedProductos);
  };

  const crearPedido = async () => {

    if (selectedProductos.length === 0 || selectedProductos.every((producto) => !producto.id)) {
      Toast.fire({
        icon: 'error',
        title: 'El pedido debe llevar al menos un producto!',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newPedido = {
      fechaPedido: new Date().toISOString().split('T')[0],
      fechaEntrega: null,
      fechaEsperada: fechaEsperada,
      estado: 'Activo',
      comentarios: comentarios,
    };
    console.log(selectedProductos);

    const payload = {
      pedido: newPedido,
      productos: selectedProductos
    };

    try {
      const URL = '/admin/pedido/crear';
      const response = await axios.post(URL, payload);
      if (response.status === 201) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido creado exitosamente!',
          confirmButtonText: 'OK',
        });
        setSelectedProductos([{ id: '', cantidad: 1 }]);
        setfechaEsperada('');
        setComentarios('');
        setNewPedidoView(false);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEditClick = (customer) => {
    setselectedOrder(customer);
    setEditModalVisible(true);
  };

  const handleViewClick = (customer) => {
    setselectedOrder(customer);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (customer) => {
    setselectedOrder(customer);
    setConfirmDeleteVisible(true);
  };

  const handleEditSave = (updatedCustomer) => {
    // Lógica para guardar los cambios en el cliente
    setEditModalVisible(false);
    console.log('Customer updated:', updatedCustomer);
  };

  const handleDeleteConfirm = () => {
    setConfirmDeleteVisible(false);
    console.log('Customer deleted:', selectedOrder);
  };


  return (
    <>
      <div className='flex flex-col w-full gap-5 h-screen'>
        <div><h2 className='text-2xl'>Gestión de pedidos</h2></div>
        <div className='w-full flex justify-center'>
          <button onClick={() => setNewPedidoView(true)} className='bg-gray-300 px-6 py-2 rounded-lg duration-300 hover:scale-105 hover:text-white hover:bg-green-500'>Crear nuevo pedido</button>
        </div>
        <div className="table-view bg-gray-200 w-full h-full mt-5">
          <Table
            headers={headers}
            notShow={true}
            data={pedidos}
            onEdit={handleEditClick}
            onView={handleViewClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      {newPedidoView && (
        <div className='absolute inset-0 h-screen w-screen flex justify-center items-center bg-gray-400 bg-opacity-65'>
          <div className='bg-white p-5'>
            <div className='flex justify-between gap-5'>
              <h2>Crear pedido</h2>
              <button onClick={() => setNewPedidoView(false)}>Cerrar</button>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center gap-2'>
                <label htmlFor="fechaEsperada">¿Para cuando es?</label>
                <input
                  type="date"
                  id='fechaEsperada'
                  value={fechaEsperada}
                  onChange={(e) => setfechaEsperada(e.target.value)}
                  required
                />
              </div>
              <div className='flex justify-between items-center gap-2'>
                <label htmlFor="comentarios">Ingresa comentarios del pedido</label>
                <input
                  type="text"
                  id='comentarios'
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  required
                />
              </div>
              {selectedProductos.map((producto, index) => (
                <div key={index} className='flex flex-row gap-2 items-center'>
                  <select
                    value={producto.id}
                    onChange={(e) => handleSelectChange(index, e)}
                    required
                  >
                    <option value="" disabled>Selecciona un producto</option>
                    {productos.map((prod) => (
                      <option key={prod.id} value={prod.id}> {prod.nombre} </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadChange(index, e)}
                    min="1"
                    placeholder="Cantidad"
                  />
                  <button
                    onClick={() => eliminarProducto(index)}
                    className='text-red-500'
                    aria-label="Eliminar producto"
                  >
                    X
                  </button>
                </div>
              ))}
              <div className='flex justify-center items-center'>
                <button onClick={agregarProducto}>Agregar producto</button>
              </div>
              <div className='flex justify-center items-center'>
                <button onClick={crearPedido}>Crear pedido</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
