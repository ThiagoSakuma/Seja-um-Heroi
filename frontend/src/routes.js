import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/login';
import Registro from './pages/registro'
import Perfil from './pages/perfil'
import NovoCaso from './pages/NovoCaso'

//Componente das rotas
export default function Router() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Login/>} />
            <Route path="/registro" element={<Registro/>} />
            <Route path="/perfil" element={<Perfil/>} />
            <Route path="/caso/novo" element={<NovoCaso/>} />
        </Routes>
    </BrowserRouter>
    )
}