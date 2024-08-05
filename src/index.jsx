import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Ecommerce from './components/ecommerce/Ecommerce'
import './input.css'


ReactDOM.createRoot( document.getElementById('root')).render(
    <React.StrictMode>
        <Ecommerce />
       <BrowserRouter>
            <App />
       </BrowserRouter>
    </React.StrictMode> 
)