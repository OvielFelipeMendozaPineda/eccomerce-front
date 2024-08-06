import React from 'react'
import Header from './Header/HeaderEcommerce'
import FooterEcommerce from './FooterEcommerce/FooterEcommerce'
import Banner from './Banner/Banner';
import Section from './Section/Section';
// import "./Ecommerce.css"
export default function Ecommerce() {
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
            <Section />
            <FooterEcommerce />
        </div>
        
        )
}
