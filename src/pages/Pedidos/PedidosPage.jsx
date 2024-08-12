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

export default function PedidosPage() {
  const [headers, setHeaders] = useState([]);
  const [newPedidoView, setNewPedidoView] = useState(false);
  const [pedidosEstado, setPedidosEstado] = useState('Seleccionar estado');
  const [fechaEsperada, setFechaEsperada] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedProductos, setSelectedProductos] = useState([{ id: '', cantidad: 1 }]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [isPedidosLoaded, setIsPedidosLoaded] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState('');
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  const estadosEnum = ['CREADO', 'PAGADO', 'ENTREGADO', 'CANCELADO'];

  useEffect(() => {
    const fetchProductos = async () => {
      const productos = await getAllProductos();
      setProductos(productos);
    };
    fetchProductos();
  }, []);

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
        });
        setSelectedProductos([{ id: 0, cantidad: 1 }]);
        setFechaEsperada('');
        setComentarios('');
        setNewPedidoView(false);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditModalVisible(true);
  };

  const handlePayClick = (order) => {
    setSelectedOrder(order);
    setPayModalVisible(true);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setViewModalVisible(true);
  };

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setConfirmDeleteVisible(true);
  };

  const handleEditSave = async (updatedOrder) => {
    const url = `/admin/pedido/update/${updatedOrder.id}`;
    try {
      const response = await axios.put(url, updatedOrder);
      if (response.status === 200) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido actualizado exitosamente!',
        });
      }
    } catch (error) {
      handleErrors(error);
    }
    setEditModalVisible(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const url = `/admin/pedido/delete?id=${selectedOrder.id}`;
      const res = await axios.delete(url);
      if (res.status === 204) {
        Toast.fire({
          icon: 'success',
          title: 'Pedido eliminado exitosamente!',
        });
      }
    } catch (error) {
      handleErrors(error);
    }
    setConfirmDeleteVisible(false);
  };

  const getAllPedidos = async () => {
    try {
      const url = '/admin/pedido/getAll';
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data || [];
      }
      return [];
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

  useEffect(() => {
    const fetchPedidos = async () => {
      let pedidosFetch = [];
      if (pedidosEstado === 'Seleccionar estado') {
        pedidosFetch = await getAllPedidos();
      } else {
        pedidosFetch = await getAllPedidosByEstado(pedidosEstado);
      }
      setPedidos(pedidosFetch);
      setIsPedidosLoaded(true);
    };
    fetchPedidos();
  }, [pedidosEstado]);

  useEffect(() => {
    if (!isPedidosLoaded || pedidos.length === 0) return;

    const dynamicHeaders = Object.keys(pedidos[0])?.map((key) => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      className: 'text-gray-500'
    }));
    setHeaders(dynamicHeaders);
  }, [pedidos, isPedidosLoaded]);

  const handleStatusSelectorChange = (e) => {
    setPedidosEstado(e.target.value);
  };

  const getAllClientes = async () => {
    try {
      const response = await axios.get('/admin/cliente/getAll');
      if (response.status === 200) {
        setClientes(response.data);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  useEffect(() => {
    getAllClientes();
  }, []);

  const handleSearchBetweenDates = () => {
    if (fechaInicio && fechaFin) {
      const filtered = pedidos.filter(pedido => {
        const itemDate = new Date(pedido.fechaPedido);
        return itemDate >= new Date(fechaInicio) && itemDate <= new Date(fechaFin);
      });
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    handleSearchBetweenDates();
  }, [fechaInicio, fechaFin, pedidos]);

  const selectedClienteFilter = (event) => {
    const clienteNombre = event.target.value;
    setSelectedCliente(clienteNombre);
  };

  useEffect(() => {
    const filtered = pedidos.filter(pedido =>
      pedido.cliente === selectedCliente || selectedCliente === ''
    );

    setFilteredData(filtered);
  }, [pedidos, selectedCliente]);

  return (
    <>
      <div className='flex flex-col w-full gap-5 h-screen'>
        <div><h2 className='text-2xl'>Gestión de pedidos</h2></div>
        <div className='w-full flex justify-center'>
          <button onClick={() => setNewPedidoView(true)} className='bg-gray-300 px-6 py-2 text-bold rounded-lg duration-300 hover:scale-105 hover:text-white hover:bg-green-500'>Crear nuevo pedido</button>
        </div>
        <div className='flex gap-5 items-center'>
          <label>Buscar Pedido por estado </label>
          <select onChange={handleStatusSelectorChange} className='rounded-lg focus:ring-0' name="searchByStatus">
            <option value="Seleccionar estado"> Seleccionar estado </option>
            {estadosEnum.map((estado, index) => (
              <option key={index} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <div className='flex gap-5 items-center'>
          <label>Buscar Pedido por cliente </label>
          <select value={selectedCliente} onChange={selectedClienteFilter}>
            <option value="">Seleccionar cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={`${cliente.nombre} ${cliente.apellido}`}>{cliente.nombre}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-5 items-center">
          <label>Filtrar por fecha de pedido </label>
          <input className="rounded-lg focus
" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          <input className="rounded-lg focus
" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
        </div>
        <div>
          <Table headers={headers} data={filteredData.length > 0 ? filteredData : pedidos} actions={{ onEdit: handleEditClick, onDelete: handleDeleteClick, onView: handleViewClick, onPay: handlePayClick }} />
        </div>
        {newPedidoView && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Crear Pedido</h2>
            <div className="flex flex-col gap-5 w-1/3">
              <label>Fecha Esperada:</label>
              <input
                type="date"
                className="border rounded-lg px-2 py-1 focus
"
                value={fechaEsperada}
                onChange={(e) => setFechaEsperada(e.target.value)}
              />
              <label>Comentarios:</label>
              <textarea
                className="border rounded-lg px-2 py-1 focus
"
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
              />
              <h3 className="text-lg">Productos:</h3>
              {selectedProductos.map((producto, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    className="rounded-lg focus
"
                    value={producto.id}
                    onChange={(e) => handleSelectChange(index, e)}
                  >
                    <option value="">Seleccionar producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="w-20 rounded-lg focus
"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadChange(index, e)}
                    min={1}
                  />
                  <Button type="danger" label="Eliminar" onClick={() => eliminarProducto(index)} />
                </div>
              ))}
              <Button label="Agregar Producto" onClick={agregarProducto} />
              <Button label="Crear Pedido" onClick={crearPedido} />
              <Button type="danger" label="Cancelar" onClick={() => setNewPedidoView(false)} />
            </div>
          </div>
        )}
        {editModalVisible && (
          <ModalEditar
            order={selectedOrder}
            onSave={handleEditSave}
            onCancel={() => setEditModalVisible(false)}
          />
        )}
      </div>
    </>
  );
}
