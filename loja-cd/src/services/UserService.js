import axios from "axios";
const API_URL = "http://localhost:5215/api/";

// Cadastro Aluno: role funcionario, 

// Cadastro Curso: role professor

// Carômetro: todos

const user = JSON.parse(localStorage.getItem('user'));

const getPublicContent = () => {

    return axios.get(API_URL + "catalogo");
};

const getCD = async () => {
    return await axios.get(API_URL + "cd", { headers: { Authorization: 'Bearer ' + user.token } });
};

const postCD = async (ID, cd) => {
    if (ID !== 0) {
        const URL = API_URL + "cd/" + ID
        return await axios.put(URL, cd, { headers: { Authorization: 'Bearer ' + user.token }});
    }
    else {
        return await axios.post(API_URL + "cd", cd , {headers: { Authorization: 'Bearer ' + user.token } });
        };
};

const deleteCD = async (ID) => {
    const URL = API_URL + "cd/" + ID
    return await axios.delete(URL, { headers: { Authorization: 'Bearer ' + user.token } });
};

const getUsuario = async () => {
    return await axios.get(API_URL + "usuario", { headers: { Authorization: 'Bearer ' + user.token } });
};

const postUsuario = async (ID, usuario) => {
    if (ID !== 0) {
        const URL = API_URL + "usuario/" + ID
        return await axios.put(URL, usuario, { headers: { Authorization: 'Bearer ' + user.token }});
    }
    else {
        return await axios.post(API_URL + "usuario", usuario , { headers: { Authorization: 'Bearer ' + user.token } });
        };
};

const deleteUsuario = async (ID) => {
    const URL = API_URL + "usuario/" + ID
    return await axios.delete(URL, { headers: { Authorization: 'Bearer ' + user.token } });
};


const UserService = {
getPublicContent,
getCD: getCD,
postCD: postCD,
deleteCD, deleteCD,
getUsuario: getUsuario,
postUsuario: postUsuario,
deleteUsuario: deleteUsuario
};

export default UserService;