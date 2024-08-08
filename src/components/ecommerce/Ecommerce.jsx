import React from 'react'
import Header from './Header/HeaderEcommerce'
import FooterEcommerce from './FooterEcommerce/FooterEcommerce'
import Banner from './Banner/Banner';
import Section from './Section/Section';
import { AddProductForm } from '../common/FormCreate/FormCreate';
import { handleErrors } from '../../utils/HandleErrors/HandleErrors';
import axios from '../../utils/axios/ConfigAxios';
import Swal from 'sweetalert2';
// import "./Ecommerce.css"
export default function Ecommerce() {

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

const getAllGamas = async () => {
  try {
      const response = await axios.get(`/admin/gama/getAll`);
      return response.data || [];
  } catch (error) {
      console.error('Error fetching all gamas:', error);
      return [];
  }
};

const getAllProveedores = async () => {
  try {
      const response = await axios.get(`/admin/proveedor/getAll`);
      return response.data || [];
  } catch (error) {
      console.error('Error fetching all proveedores:', error);
      return [];
  }
};

    // const gamas = getAllGamas();
    
    // const proveedores = getAllProveedores();

    const gamas = [
      { id: 1, nombre: 'Gama Alta' },
      { id: 2, nombre: 'Gama Media' },
      { id: 3, nombre: 'Gama Baja' },
    ];
  
    const proveedores = [
      { id: 1, nombre: 'Proveedor 1' },
      { id: 2, nombre: 'Proveedor 2' },
      { id: 3, nombre: 'Proveedor 3' },
    ];

    return (
        <div >
            <Header />
            <Banner />
            <AddProductForm gamas= {gamas} proveedores= {proveedores} />
            <Section />
            <FooterEcommerce />
        </div>
        
        )
}
