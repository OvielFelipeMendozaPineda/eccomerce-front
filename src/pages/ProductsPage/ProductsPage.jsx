import React from 'react'
import ProductTable from '../../components/common/Table/Table';
import Table from '../../components/common/Table/Table';
import Header from '../../components/common/Header/Header';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Button from '../../components/common/Button/Button';
import Modal from '../../components/Modal/Modal';
import { useState } from 'react';
import { productInput, dropdownInput } from '../../utils/inputs/product/product';
import { render } from '@testing-library/react';


console.log(dropdownInput);

export default function ProductsPage() {
    const products = [
        { imageUrl: 'https://cdn.usegalileo.ai/stability/90aa788c-1e5b-4186-91ce-c2ad34320bbf.png', name: 'Coffee Mug', price: '$15', inventory: '12', status: 'Active' },
        { imageUrl: 'https://cdn.usegalileo.ai/stability/90aa788c-1e5b-4186-91ce-c2ad34320bbf.png', name: 'Coffee Mug', price: '$15', inventory: '12', status: 'Active' },
    ];
    const headers = [
        { title: 'Product', key: 'name', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-176 px-4 py-3 text-left text-[#0e141b] w-[400px] text-sm font-medium leading-normal' },
        { title: 'Price', key: 'price', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-296 px-4 py-3 text-left text-[#4f7296] w-[400px] text-sm font-medium leading-normal' },
        { title: 'Inventory', key: 'inventory', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-416 px-4 py-3 text-left text-[#4f7296] w-[400px] text-sm font-medium leading-normal' },
        {
            title: 'Status', key: 'status', className: 'table-ec883312-db4a-45d6-8895-5f43c9f4c6a2-column-536 px-4 py-3 text-left text-[#0e141b] w-60 text-sm font-medium leading-normal', render: row => (
                <button
                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#e8edf3] text-[#0e141b] text-sm font-medium leading-normal w-full"
                >
                    <span className="truncate">{row.status}</span>
                </button>
            )
        }
    ];
    const [showModal, setshowModal] = useState(false)
    const handleModal = (e) => {
        if (!showModal) {
            console.log("true");

            setshowModal(true)
        } else {
            console.log("false");

            setshowModal(false)
        }
    }


    return (
        <>
            <div className='flex flex-col w-full h-screen '>
                <div className='my-5 text-3xl font-medium'><Header pageTitle={"Productos"} /></div>
                <div className='w-96 my-5'><SearchBar /></div>
                <div className='flex justify-end w-96'>
                    <div className='w-96 my-5 '>
                        <Button children={'Crear nuevo producto'} id={"create-product-btn"} className={'bg-gray-200 w-full p-3 rounded-xl font-medium hover:bg-gray-300'} onClick={handleModal} type={'button'} />
                    </div>
                </div>
                <div className='mt-10'>
                    <Table headers={headers} data={products} />
                </div>
            </div>
            <Modal modalTitle="Crear producto" fields={productInput} dropdownFields={dropdownInput} show={showModal} handleModal={handleModal} />
        </>
    )
}
