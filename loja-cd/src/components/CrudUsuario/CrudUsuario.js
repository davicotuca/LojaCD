import { useEffect, useState } from "react";
import axios from 'axios';
import './CrudUsuario.css';
import Main from '../template/Main';
    
        
export default function CrudUsuario(){

    const [ID, setID] = useState (0)
    const [nome, setNome] = useState ('')
    const [cargo, setCargo] = useState ('')
    const [Usuarios, setUsuarios] = useState([]); 

    const urlAPI = 'http://localhost:5215/api/Usuario'
    
    useEffect(() => {
        axios.get(urlAPI)
            .then((response) => {
                console.log(response.data)
                setUsuarios(response.data);
            });
    }, []);

    useEffect(() => {
        limpar()
    }, [Usuarios]);

    const saveAPIData = () => {
        if (ID !== 0) {
            const URL = urlAPI + '/' + ID
            axios.put(URL, {
                usuario: ID, nome, cargo
            }).then(() => {
                getData();
            })
         }
        else {
            axios.post(urlAPI, {
                usuario: 0, nome, cargo
            }).then(() => {
                getData();         
            })
        }
    }

    const getData = () => {
        axios.get(urlAPI)
            .then((getData) => {
                setUsuarios(getData.data);
            })
    }

    const setData = (data) => {
        let { id, nome, cargo } = data;
        setID(id);
        setNome(nome);
        setCargo(cargo);
    }

    const deleteAPIData = (id) => {
        const URL = urlAPI + '/' + id
        axios.delete(URL)
        .then(() => {
             getData();
        })
    }

    const limpar = () => {
        setID(0);
        setNome('');
        setCargo('');
    }
        
    return (
        <Main>
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome"
                    className="form-input"
                    name="nome"

                    value={nome}
                    onChange={ e => setNome(e.target.value)}
                />
                <label> Cargo: </label>
                <input
                    type="number"
                    id="cargo"
                    placeholder="0"
                    className="form-input"
                    name="cargo"

                    value={cargo}
                    onChange={ e => setCargo(e.target.value)}
                />
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
                        <th className="tabTituloNome">Nome</th>
                        <th className="tabTituloCurso">Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {Usuarios.map((data) => {
                        return (
                        <tr key={data.id}>
                        <td>{data.nome}</td>
                        <td>{data.cargo}</td>
                        <td>
                            <button id= {data.id} onClick={() => setData(data)}>
                                Alter
                            </button>
                        </td>
                        <td>
                            <button  onClick={() => deleteAPIData(data.id)}>
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
