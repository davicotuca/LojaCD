import React from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import CrudCd from './components/CrudCd/CrudCd';
import CrudUsuario from './components/CrudUsuario/CrudUsuario';
import Catalogo from './components/Catalogo/Catalogo';


export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo!">
                        <div>Cadastro de CDs, Funcionários e catálogo</div>
                    </Main> }
            />
            <Route path='/cds' element={<CrudCd />} />
            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>}     
            />
            <Route path='/usuarios' element={<CrudUsuario />} />
            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>}     
            />
            <Route path='/catalogo' element={<Catalogo />} />
            <Route path='*' element={
                <Main title="Bem Vindo!">
                    <div>Página não encontrada</div>
                </Main>}     
            />
        </Routes>
    )
}