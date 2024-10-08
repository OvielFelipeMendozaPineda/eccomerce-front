import React from 'react';
import { Toggle } from '../Toggle/Toggle';
import axios from '../../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';

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

const Table = ({ data, headers, notShow, onEdit, onView, onDelete, onPay, showPayButton = false }) => {

  const handleToggleChange = async (row) => {
    const data = new FormData();

    data.append('producto', new Blob([JSON.stringify({
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio: row.precio,
      gamaId: row.gamaId,
      proveedorId: row.proveedorId,
      estado: !row.estado
    })], { type: 'application/json' }));


    if (row.imagen) {
      data.append('imagen', row.imagen);
    }

    try {
      const response = await axios.put(`/admin/producto/update/${row.id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Producto actualizado con éxito',
      });
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error al actualizar el producto',
      });
    }
  };
  ;
  
  return (
    <div className="px-4 py-3">
      <div className="flex overflow-x-scroll overflow-y-scroll rounded-xl border border-[#d0dbe6] bg-[#f8fafb]">
        <table className="flex-1">
          <thead>
            <tr className="bg-[#f8fafb]">
              {headers.map((header, index) => (
                <th key={index} className={header.className}>
                  {header.title}
                </th>
              ))}
              {notShow ? (
                <th className='px-4 py-3 text-left text-[#0e141b] w-[400px] text-sm font-medium leading-normal'>
                  Status
                </th>
              ) : ""}
              <th className='py-3 text-center text-[#0e141b] text-sm font-bold'>
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-t-[#d0dbe6]">
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className='text-black text-center'>
                      {header.render ? header.render(row) : row[header.key]}
                    </td>
                  ))}
                  {notShow ? (
                    <td>
                      <Toggle
                        checked={row.estado === true}
                        onChange={() => handleToggleChange(row)}
                      />
                    </td>
                  ) : ""}
                  <td className=' flex justify-center gap-5'>
                    <div className="inline-flex rounded-lg border border-gray-100 gap-5 bg-gray-100 p-1">
                      {showPayButton && row.estado != 'PAGADO' ? (
                        <button onClick={() => { onPay(row) }} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-green-500 shadow-sm focus:relative">
                          <box-icon name='purchase-tag-alt' type='solid' color='#4cf38a' ></box-icon>
                          pagar
                        </button>
                      ) : (null)}
                      <button onClick={() => { onEdit(row) }} className="edit-btn inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                      </button>
                      <button onClick={() => onView(row)} className="details-btn inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 hover:text-gray-700 focus:relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        View
                      </button>
                      <button onClick={() => onDelete(row)} className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm text-blue-500 shadow-sm focus:relative">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 2} className="p-5">
                  <div className="bg-gray-200 p-5 flex justify-center items-center w-full h-20 rounded-md shadow-md">
                    <h2 className="text-gray-700 font-semibold">No hay registros</h2>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
