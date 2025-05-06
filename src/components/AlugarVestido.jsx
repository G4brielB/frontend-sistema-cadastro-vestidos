import '../styles/AlugarVestido.css'
import { criarAluguel } from '../api/Api'
import { useState} from 'react'

export default ({mostrar, vestido, onCLose, onAluguelSuccess}, ...props) => {

    
    const [formData, setFormData] = useState({
        nomeCliente: '',
        telefone: '',
        endereco: '',
        data_retirada: '',
        data_devolucao: ''
    })
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await criarAluguel(formData)

            alert("Aluguel registrado com sucesso")
            onAluguelSuccess();
            onclose()

        }catch(erro){
            console.error("Erro ao alugar: ", erro.response?.data || erro.message)
            alert("Erro ao registrar aluguel: " + (erro.response?.data?.message || erro.message))
        }
    }

    const fecharJanela = () => {
        mostrar = null
    }
    
    if(!mostrar) return null


        return(
            <div className="container">
                <div className="janela-flutuante">

                    <h1>Alugar vestido</h1>

                    <p>Nome do vestido: {vestido.nome_vestido}</p>
                    <p>Codigo do vestido: {vestido.cod_vestido}</p>

                    <form className="form-data" onSubmit={handleSubmit}>

                        <label >
                            Nome cliente: 
                            <input type="text"
                                    className="input"
                                    name="nomeCliente" 
                                    onChange={handleChange}
                                    required/>
                        </label>
                        <br />
                        <label>
                            Endereço: 
                            <input type="text" 
                                    className="input"
                                    name="endereco"
                                    onChange={handleChange}
                                    required/>
                        </label>
                        <br />
                        <label>
                            Telefone:
                            <input type="text" 
                                    className="input"
                                    name="telefone"
                                    onChange={handleChange}
                                    required/>
                        </label>
                        <label className="label-data">
                        Data de entrega do vestido:
                            <input type="date" 
                            className="input-data input"
                            name="dataRetirada"
                            onChange={handleChange}
                            required/>
                        </label>
                        <br />
                        <label className="label-data">
                        Data de devolução do vestido:
                            <input type="date" 
                            name="dataDevolucao"
                            className="input-data input"
                            onChange={handleChange}
                            required/>
                        </label>
                        <button
                            type="submit" 
                            className="btn-aluguel"
                            onClick={fecharJanela()}
                            >Alugar</button>
                    </form>

                </div>
            </div>
        )
    
}