import axios from "axios"
import Dropdown from "../../../components/common/Input/Dropdown"

export const productInput = [
    { text: 'text', id: 'name', name: 'name', autoComplete: 'name', labelText: 'Nombre del producto', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 mb-3 w-full ', maxLength: 50 },
    { text: 'text', id: 'description', name: 'description', autoComplete: 'description', labelText: 'Descripcion', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 mb-3 w-full ', maxLength: 100 },
    { text: 'number', id: 'price', name: 'price', autoComplete: 'price', labelText: 'Descripcion', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 mb-3 w-full ' },
    { text: 'text', id: 'code', name: 'code', autoComplete: 'code', labelText: 'Codigo', placeholder: '', required: 'required', className: 'rounded-lg p-1.5 mb-3 w-full ', maxLength: 100 }
]


const proveedoresJSON = async () => {
    try {
        const response = await axios.get("prooveder/getAll")
        if (response.data) {
            return response.data
        } else {
            return []
        }
    } catch (error) {
        console.warn(error);
        return []

    }

}
console.log(proveedoresJSON);



const gamasJSON = async () => {
    try {
        const response = await axios.get("gama/getAll")
        if (response.data) {
            return response.data
        } else {          
            return []
        }
    } catch (error) {
        console.warn(error);
        return []

    }

}

 
export const dropdownInput = [
    {
        name: "provider", id: "provider", labelText: "Escojer proveedor", optionsFields: await proveedoresJSON()
    },
    {
        name: "gama", id: "gama", labelText: "Escojer gama", optionsFields: await gamasJSON()
    }
]



