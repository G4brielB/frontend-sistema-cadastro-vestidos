import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"
})

export const cadastrarVestido = (dados) => api.post('/vestidos', dados)
export const buscarDados = () => api.get('/vestidos')


export default api;