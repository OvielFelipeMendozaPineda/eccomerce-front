import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import { Route, Routes } from 'react-router-dom';


const App = () => (
    <div className="App">
        <Routes>
            <Route path='/login' element={<LoginForm />} />
        </Routes>

    </div>
);

export default App;
