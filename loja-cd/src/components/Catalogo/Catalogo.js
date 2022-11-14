import { useEffect, useState } from "react";
import axios from 'axios';
import './Catalogo.css';
import Main from '../template/Main';
import Natassha from '../../assets/imagens/logo_cd.png';

export default function Catalogo(){
    const [listaCds, setListaCds] = useState([]);

    const urlCd = 'http://localhost:5215/api/CD'

    useEffect(() => {
        axios.get(urlCd)
            .then((response) => {
                console.log(response.data)
                setListaCds(response.data);
            });
    }, []);

    return(

        <Main>
            <table className="catalogo">
                {listaCds.map((cd) => {
                        return (
                            <div class="card">
                                <img src={require(`../../assets/cds/${cd.nome}.png`)} alt="Avatar"/>
                                <div class="container">
                                    <h4><b>{cd.nome}</b></h4>
                                    <p>{cd.artista}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </table>
            
        </Main>
    )
}
 