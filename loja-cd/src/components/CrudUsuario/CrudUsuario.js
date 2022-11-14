import { useEffect, useState } from "react";
import './CrudUsuario.css';
import Main from '../template/Main';
import UserService from '../../services/UserService';
    
        
export default function CrudUsuario(){

    const [ID, setID] = useState (0)
    const [nome, setNome] = useState ('')
    const [username, setUsername] = useState ('')
    const [senha, setSenha] = useState ('')
    const [role, setRole] = useState ('')
    const [Usuarios, setUsuarios] = useState([]); 
    const [msg, setMsg] = useState([]);

    
    useEffect(() => {
        UserService.getUsuario()
            .then((response) => {
                setUsuarios(response.data);
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
    }, [Usuarios]);

    const saveAPIData = () => {
        let usuarioParaPost = {usuario: ID, nome, username, senha, role}
        UserService.postUsuario(ID, usuarioParaPost).then(() => {
                getData();         
        })
        
    }

    const getData = () => {
        UserService.getUsuario()
            .then((getData) => {
                setUsuarios(getData.data);
            },
            (error) => {
                const _msg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMsg(_msg);
            })
    }

    const setData = (data) => {
        let { id, nome, username, senha, role } = data;
        setID(id);
        setNome(nome);
        setUsername(username);
        setSenha(senha);
        setRole(role);
    }

    const deleteUsuario = (id) => {
        UserService.deleteUsuario(id).then(() => {
            getData();
        })
    }

    const limpar = () => {
        setID(0);
        setNome('');
        setUsername('');
        setSenha('');
        setRole('');
    }
        
    return (
        <Main>
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
                                onChange={ e => setNome(e.target.value)}
                            />
                        </td>
                        <td>
                            <label> Username: </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="username"
                                className="form-input"
                                name="username"

                                value={username}
                                onChange={ e => setUsername(e.target.value)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label> Senha: </label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="senha"
                                className="form-input"
                                name="senha"

                                value={senha}
                                onChange={ e => setSenha(e.target.value)}
                            />
                        </td>
                        <td>
                            <label> Role: </label>
                            <input
                                type="text"
                                id="role"
                                placeholder="role"
                                className="form-input"
                                name="role"

                                value={role}
                                onChange={ e => setRole(e.target.value)}
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
                        <th className="tituloNome">Username</th>
                        <th className="tituloRole">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {Usuarios.map((data) => {
                        return (
                        <tr key={data.id}>
                        <td>{data.nome}</td>
                        <td>{data.username}</td>
                        <td>{data.role}</td>
                        <td>
                            <button id= {data.id} onClick={() => setData(data)}>
                                Alter
                            </button>
                        </td>
                        <td>
                            <button  onClick={() => deleteUsuario(data.id)}>
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
