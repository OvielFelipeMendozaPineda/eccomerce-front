import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import {Home,   DefaultComponent } from './pages/Home/Home';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import NotFound from './pages/NotFound/NotFound';

const App = () => (
    <div className="App">
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
            <Route path='/register' element={<SignUpPage />} />
            <Route path='/home' element={<Home />}>
                <Route index element={<DefaultComponent/>}/>
            </Route>
        </Routes>

    </div>
);

export default App;
