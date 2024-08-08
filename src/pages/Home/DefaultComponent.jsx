import React, { useEffect } from 'react';
import axios from '../../utils/axios/ConfigAxios';
import { useState } from 'react';


const DefaultComponent = () => {
  const [data, setData] = useState(null);
    return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Este es el contenido por defecto.</p>
    </div>
  );
}

export default DefaultComponent;