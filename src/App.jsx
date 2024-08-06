import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import { AuthProvider } from './utils/Authorized';
import RutaPrivada from './utils/RutaPrivada';
import DefaultComponent from './pages/Home/DefaultComponent';
import Ecommerce from './components/ecommerce/Ecommerce';
import CustomerPage from './pages/CustomerPage/CustomerPage';



const App = () => (
    <div className="App h-screen">
        <AuthProvider>
            <Routes>
                <Route path='/login' element={<LoginPage />} />
                <Route path='/landing' element={<Ecommerce />}></Route>
                <Route path='/register' element={<SignUpPage />} />
                <Route path='/home' element={<RutaPrivada />}>
                    <Route path='' element={<Home />}>
                        <Route index element={<DefaultComponent />} />
                        <Route path='productos' element={<ProductsPage />} />
                        <Route path='customers' element={<CustomerPage />} >

                        </Route>
                    </Route>
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </AuthProvider>
    </div>
);

export default App;
