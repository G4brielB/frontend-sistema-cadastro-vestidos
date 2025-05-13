import '../styles/AlugarVestido.css'
import { criarAluguel } from '../api/Api'
import { useState, useEffect} from 'react'

export default ({mostrar, vestido, onFechar}, ...props) => {

    


    const [formData, setFormData] = useState({
        codigo_vestido: '', 
        nomeCliente: '',
        telefone: '',
        endereco: '',
        dataRetirada: '',
        dataDevolucao: ''
    })
    
    

    const handleChangeAluguel = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitAluguel = async (e) => {
        e.preventDefault();

        try{
            await criarAluguel(formData)
            alert("Aluguel registrado com sucesso")
            


        }catch(erro){
            console.error("Erro ao alugar: ", erro.response?.data || erro.message)
            alert("Erro ao registrar aluguel: " + (erro.response?.data?.message || erro.message))
        }
    }

    console.log(formData)
   

    const fecharJanela = () => {
        onFechar()
    }
    
    if(!mostrar) return null

    console.log(mostrar)

        return(
            <div className="container" onClick={fecharJanela()}>
                <div className="janela-flutuante">

                    <div className="fechar" onCLick={fecharJanela()}> X </div>

                    <h1>Alugar vestido</h1>

                    


                    {/*<p>Nome do vestido: {vestido.nome_vestido} Codigo: {vestido.cod_vestido}</p>*/}
                    

                    <form className="form-data" onSubmit={handleSubmitAluguel}>

                        <label>
                            Codigo Vestido: 
                            <input type="number"
                                    name="codigo_vestido"
                                    onChange={handleChangeAluguel}
                                    className="input"       
                                    required />
                        </label>

                        <label >
                            Nome cliente: 
                            <input type="text"
                                    className="input"
                                    name="nomeCliente" 
                                    onChange={handleChangeAluguel}
                                    required/>
                        </label>
                        <br />
                        <label>
                            Endereço: 
                            <input type="text" 
                                    className="input"
                                    name="endereco"
                                    onChange={handleChangeAluguel}
                                    required/>
                        </label>
                        <br />
                        <label>
                            Telefone:
                            <input type="text" 
                                    className="input"
                                    name="telefone"
                                    onChange={handleChangeAluguel}
                                    required/>
                        </label>
                        <label className="label-data">
                        Data de entrega do vestido:
                            <input type="date" 
                            className="input-data input"
                            name="dataRetirada"
                            onChange={handleChangeAluguel}
                            required/>
                        </label>
                        <br />
                        <label className="label-data">
                        Data de devolução do vestido:
                            <input type="date" 
                            name="dataDevolucao"
                            className="input-data input"
                            onChange={handleChangeAluguel}
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