import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001"
})

export  const cadastrarVestido = async (dados) => {
    const formData = new FormData();
    formData.append('cod_vestido', dados.cod_vestido);
    formData.append('nome_vestido', dados.nome_vestido);
    //formData.append('imagem', dados.imagem);

    await api.post ('vestidos', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export const buscarDados = async () => {
    try{
        const response = await axios.get('http://localhost:3001/vestidos');
        return response.data.data
    }catch(erro){
        console.log('Erro ao listar vestidos: ', erro)
        throw erro
    }
}

/*export const buscarDadosAluguel = async () => {
    try{
        const response = await axios.get('http://localhost:3001/alugueis');
        console.log(response)
        return response.data.data
    }catch(erro){
        console.log('Erro ao listar vestidos: ', erro)
        throw erro
    }
}*/

export const criarAluguel = (dadosAluguel) => {
    const formData = new FormData()

    Object.entries(dadosAluguel).forEach(([key, value]) => {
        formData.append(key, value);
    })

    return api.post(`/alugueis`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


export default api;