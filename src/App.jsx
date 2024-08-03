import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import Home from './pages/Home/Home';
import Prueba from './components/Form de prueba/Prueba';

const App = () => (
    <div className="App">
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<SignUpPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/test' element={<Prueba />} />
        </Routes>

    </div>
);

export default App;
