import { useEffect, useState } from "react";
import axios from 'axios';
import './Catalogo.css';
import Main from '../template/Main';
import Natassha from '../../assets/imagens/logo_cd.png';

export default function Catalogo(){
    const [listaAlunos, setListaAlunos] = useState([]);
    const [listaCursos, setListaCursos] = useState([]);
    const [curso, setCurso] = useState("");

    const urlAluno = 'http://localhost:5215/api/Aluno'
    const urlCurso = 'http://localhost:5215/api/Curso'

    useEffect(() => {
        axios.get(urlAluno)
            .then((response) => {
                console.log(response.data)
                setListaAlunos(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get(urlCurso)
            .then((response) => {
                console.log(response.data)
                setListaCursos(response.data);
            });
    }, []);

    //useEffect(() => {
    //    setListaAlunos(response.data);
    //}, []);

    const atualizaCurso= (curso) => {
        setCurso(curso);
    }

    return(

        <Main>
            <div>
                <label> Código do Curso: </label>
                <select 
                    id="codCurso"
                    name="codCurso"
                    
                    value={curso}
                    
                    onChange={() => atualizaCurso(curso)}>
                
                    {listaCursos.map(
                        (curso) =>
                            <option key={curso.id} value={curso.codCurso}>{curso.nomeCurso}</option>
                        )}
                </select>
            </div>
            {listaAlunos.map((aluno) => {
                if (curso === "") {
                    return (
                        <div class="card">
                            <img src={Natassha} alt="Avatar"/>
                            <div class="container">
                            <h4><b>{aluno.ra}</b></h4>
                                <h4><b>{aluno.nome}</b></h4>
                                <p>Curso: {aluno.codCurso}</p>
                            </div>
                        </div>
                    )
                } 
                if (aluno.codCurso === curso) {
                    console.log(aluno.codCurso)
                    return (
                        <div class="card">
                            <img src={Natassha} alt="Avatar"/>
                            <div class="container">
                            <h4><b>{aluno.ra}</b></h4>
                                <h4><b>{aluno.nome}</b></h4>
                                <p>Curso: {aluno.codCurso}</p>
                            </div>
                        </div>
                    )
                }
                })}
        </Main>
    )
}
 