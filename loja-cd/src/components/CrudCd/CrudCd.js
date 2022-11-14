import { useEffect, useState } from "react";
import axios from 'axios';
import './CrudCd.css';
import Main from '../template/Main';
import UserService from '../../services/UserService';

export default function CrudCd() {

    const [ID, setID] = useState(0)
    const [nome, setNome] = useState('')
    const [artista, setArtista] = useState('')
    const [genero, setGenero] = useState('')
    const [ano, setAno] = useState('0000')
    const [Cds, setCds] = useState([]);
    const [msg, setMsg] = useState([]);

    const urlAPI = 'http://localhost:5215/api/CD'

    useEffect(() => {
        UserService.getCD().then(
            (response) => {
                setCds(response.data);
                setMsg(null);
            },
            (error) => {
                const _msg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMsg(_msg);
            }
        );
    }, []);

    useEffect(() => {
        limpar()
    }, [Cds]);

    const saveAPIData = () => {
        let cdParaPost = {cd: ID, nome, artista, genero, ano}
        UserService.postCD(ID, cdParaPost).then(() => {
            getData();
        })
    }

    const getData = () => {
        axios.get(urlAPI)
            .then((getData) => {
                setCds(getData.data);
            })
    }

    const setData = (data) => {
        let { id, nome, artista, genero, ano } = data;
        setID(id);
        setNome(nome);
        setArtista(artista);
        setGenero(genero);
        setAno(ano);
    }

    const deleteCd = (id) => {
        UserService.deleteCD(id).then(() => {
                getData();
            })
    }

    const limpar = () => {
        setID(0);
        setNome('');
        setArtista('');
        setGenero('');
        setAno('0000');
    }

    return (
        <Main title="Cadastro de CDs">
            <div className="inclui-container">
                <table className="form">
                    <tr>
                        <td>
                            <label> Nome: </label>
                            <input
                                type="text"
                                id="nome"
                                placeholder="Nome"
                                className="form-input"
                                name="nome"

                                value={nome}
                                onChange={e => setNome(e.target.value)}
                            />
                        </td>
                        <td>
                            <label> Artista: </label>
                            <input
                                type="text"
                                id="artista"
                                placeholder="Artista"
                                className="form-input"
                                name="artista"

                                value={artista}
                                onChange={e => setArtista(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label> Genero: </label>
                            <input
                                type="text"
                                id="genero"
                                placeholder="Genero"
                                className="form-input"
                                name="genero"

                                value={genero}
                                onChange={e => setGenero(e.target.value)}
                            />
                        </td>
                        <td>
                            <label> Ano: </label>
                            <input
                                type="text"
                                id="ano"
                                placeholder="Ano"
                                className="form-input"
                                name="ano"

                                value={ano}
                                onChange={e => setAno(e.target.value)}
                            />
                        </td>
                    </tr>
                </table>
                
                
                <button className="btnSalvar"
                    onClick={saveAPIData} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={limpar} >
                    Cancelar
                </button>


                <table className="listaCursos" id="tblListaCursos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tituloNome">Nome</th>
                            <th className="tituloNome">Artista</th>
                            <th className="tituloGenero">Genero</th>
                            <th className="tituloAno">Ano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Cds.map((data) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.nome}</td>
                                    <td>{data.artista}</td>
                                    <td>{data.genero}</td>
                                    <td>{data.ano}</td>
                                    <td>
                                        <button id={data.id} onClick={() => setData(data)}>
                                            Alter
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteCd(data.id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Main>
    )
}
