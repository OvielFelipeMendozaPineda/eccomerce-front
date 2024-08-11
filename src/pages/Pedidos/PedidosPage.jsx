import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import Table from '../../components/common/Table/Table';
import { ModalEditar } from '../../components/ModalEditar/ModalEditar';
import Button from '../../components/common/Button/Button';

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
    id: 1,
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
    if (response.status === 200) {
      return response.data || [];
    }
    return []
  } catch (error) {
    return [];
  }
};

const getAllPedidos = async () => {
  try {
    const url = '/admin/pedido/getAll';
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data || [];
    }
    return []
  } catch (error) {
    return [];
  }
};





const getAllPedidosByEstado = async (state) => {
  try {
    const url = `/admin/pedido/getAllByEstado?estado=${state}`;
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
  const [enviado, setenviado] = useState()

  const estadosEnum = [
    'CREADO',
    'PAGADO',
    'ENTREGADO',
    'CANCELADO',
  ]


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

        if (pedidosFetch) {
          const dynamicHeaders = Object.keys(pedidosFetch[0]).map((key) => ({
            key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            className: 'text-gray-500'
          }));
          setHeaders(dynamicHeaders);
        }
      } catch (error) {
        console.error('Error fetching pedidos:', error);
      }
    };

    fetchPedidos();


  }, [])


  useEffect(() => {
    console.log('fetch por estado');

    const fetchPedidosByEstado = async () => {
      console.log(pedidosEstado);

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
      estado: estadosEnum[0],
      comentarios: comentarios,
    };
    console.log(selectedProductos);

    const payload = {
      pedido: newPedido,
      productos: selectedProductos
    };

    try {
      const URL = '/admin/pedido/crear';
      console.log(payload);

      const response = await axios.post(URL, payload);
      if (response.status === 201) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido creado exitosamente!',
          confirmButtonText: 'OK',
        });
        setSelectedProductos([{ id: 0, cantidad: 1 }]);
        setfechaEsperada('');
        setComentarios('');
        setNewPedidoView(false);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEditClick = (order) => {
    setselectedOrder(order);

    setEditModalVisible(true);
  };

  const handleViewClick = (order) => {
    setselectedOrder(order);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (order) => {
    setselectedOrder(order);
    setConfirmDeleteVisible(true);
  };

  const handleEditSave = async (updatedOrder) => {
    const url = `/admin/pedido/update/${updatedOrder.id}`
    const payload = updatedOrder
    try {
      const response = await axios.put(url, payload)
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido actualizado exitosamente!',
          confirmButtonText: 'OK',
        });
      }

    } catch (error) {
      handleErrors(error)
    }
    setEditModalVisible(false);
    console.log('Customer updated:', updatedOrder);
  };

  const handleDeleteConfirm = async () => {
    try {
      const url = `/admin/pedido/delete?id=${selectedOrder.id}`
      const res = await axios.delete(url)
      if (res.status === 204) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido eliminado exitosamente!',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      handleErrors(error)
    }
    setConfirmDeleteVisible(false);
  };

  const handleStatusSelectorChange = (e) => {
    setPedidosEstado(e.target.value)
  }

  return (
    <>
      <div className='flex flex-col w-full gap-5 h-screen'>
        <div><h2 className='text-2xl'>Gestión de pedidos</h2></div>
        <div className='w-full flex justify-center'>
          <button onClick={() => setNewPedidoView(true)} className='bg-gray-300 px-6 py-2 text-bold rounded-lg duration-300 hover:scale-105 hover:text-white hover:bg-green-500'>Crear nuevo pedido</button>
        </div>
        <div className='flex gap-5 items-center'>
          <label>Buscar Pedido por estado </label>
          <select onChange={handleStatusSelectorChange} className='rounded-lg focus:ring-0' name="searchByStatus" >
            <option className='text-gray-200' disabled> Seleccionar estado </option>
            {estadosEnum.map(estado => (
              <option value={estado}> {estado}</option>
            ))}
          </select>
        </div>
        <div className="table-view bg-gray-200 w-full h-full mt-5">
          <Table
            headers={headers}
            notShow={false}
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
                      <option key={parseInt(prod.id)} value={parseInt(prod.id)}> {prod.nombre} </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadChange(index, e)}
                    min={1}
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
      <ModalEditar objecto={selectedOrder} show={editModalVisible} onClose={() => setEditModalVisible(false)} onSave={handleEditSave} entidad={"Pedido"} />
      <ViewOrderDetails object={selectedOrder} show={viewModalVisible} onClose={() => setViewModalVisible(false)} />
      <DeletePedido show={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)} handleSubmit={handleDeleteConfirm} />
    </>
  );
}
function ViewOrderDetails({ object, show, onClose }) {

  if (!show) return null;

  return (
    <div className="modal absolute inset-0 bg-gray-400 bg-opacity-60 flex justify-center items-center animate-fade-in">
      <div className="bg-gray-50 p-5 rounded-lg">
        <div className="header pX-5 py-3 gap-5 flex justify-between items-center">
          <h2 className="text-2xl font-medium">Detalles del pedido</h2>
          <Button children={<box-icon className='text-4xl' name='x-circle'></box-icon>} id='close-view-product-btn' onClick={onClose} type='button' className='text-gray-500 hover:text-gray-700' />
        </div>
        <div className="flex flex-col gap-5">
          {Object.entries(object)?.map(([key, value]) => (
            <>
              <label htmlFor={key}>{key}</label>
              <input type="text" disabled id={key} value={value} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
function DeletePedido({ handleSubmit, show, onClose }) {
  if (!show) return null;
  return (
    <div className="modal absolute inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <div className="header mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">¿Desea eliminar este pedido?</h2>
        </div>
        <div className="flex justify-around mt-10 items-center gap-6">
          <button onClick={onClose}
            className="border-red-600 border-2 text-red-600 text-center text-lg px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200"
          >
            No
          </button>
          <button onClick={handleSubmit}
            className="bg-green-600 text-white text-center text-lg px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Sí
          </button>
        </div>
      </div>
    </div>

  )
}
