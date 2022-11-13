import './Logo.css';
import React from 'react'
import logo from '../../assets/imagens/logo_cd.png';

export default function Logo(props) {
    return (
        <aside className="logo">
            <a href="/" className="logo">
                <img src={logo} alt="Logo" />
            </a>
        </aside>
    )
}