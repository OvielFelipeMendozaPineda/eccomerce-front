import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const App = () => (
    <div className="App">
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<SignUpPage />} />
        </Routes>

    </div>
);

export default App;
