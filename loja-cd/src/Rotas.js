import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import Main from './components/template/Main';
import CrudCd from './components/CrudCd/CrudCd';
import CrudUsuario from './components/CrudUsuario/CrudUsuario';
import Catalogo from './components/Catalogo/Catalogo';
import AuthService from './services/AuthService';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';

export default function Rotas() {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentRole, setCurrentRole] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            const role = AuthService.getCurrentUser().user.role;
            setCurrentUser(user);
            setCurrentRole(role);
        }
    }, []);
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Cadastro de CDs, Usuarios e Catalogo</div>
                    </Main>}
            />
            {currentUser ? (
                <Route exact path='/cds'
                    element={<CrudCd />}
                />
            ) : (
                <Route exact path='/cds'
                    element={
                        <Main title="Cadastro de Cds">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            {currentRole === "gerente" ? (
                <Route exact path='/usuarios'
                    element={<CrudUsuario />
                    }
                />
            ) : (
                <Route exact path='/usuarios'
                    element={
                        <Main title="Cadastro de Usuarios">
                            <div>Não autorizado!</div>
                        </Main>
                    }
                />
            )}
            <Route exact path='/catalogo'
                element={<Catalogo />
                }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path="*" to='/' />
        </Routes>
    )
}