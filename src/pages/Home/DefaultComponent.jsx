import React, { useEffect } from 'react';
import axios from '../../utils/axios/ConfigAxios';
import { useState } from 'react';


const DefaultComponent = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/v1/getCliente');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el contenido por defecto.</p>
      <p>{data ? JSON.stringify(data) : "No hay nada"}</p>
    </div>
  );
}

export default DefaultComponent;