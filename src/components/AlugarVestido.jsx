import '../styles/AlugarVestido.css'
import { criarAluguel } from '../api/Api'
import { useState, useEffect} from 'react'

export default ({mostrar, vestido, onFechar}, ...props) => {

    const fecharModal = (e) => {
        e.stopPropagation();
        onFechar()
    }


    const [formData, setFormData] = useState({
        codigo_vestido: '', 
        nomeCliente: '',
        telefone: '',
        endereco: '',
        dataRetirada: '',
        dataDevolucao: ''
    })

    useEffect(() => {
        if(vestido) {
            setFormData(prev => ({
                ...prev,
                codigo_vestido: vestido.cod_vestido
            }))
        }
    },[vestido])
    
    

    const handleChangeAluguel = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitAluguel = async (e) => {
        e.preventDefault();

        try{
            alert('Processando aluguel')
            const response = await criarAluguel(formData)
            if(response && response.status === 200) {

                alert("Aluguel registrado com sucesso")
                onFechar();
            }else {
                alert("O aluguel foi processado, mas não recebemos confirmação")
            }

        }catch(erro){
            console.error("Erro ao alugar: ", erro.response?.data || erro.message)
            alert("Erro ao registrar aluguel: " + (erro.response?.data?.message || erro.message))
        }
    }

    if(!mostrar) return null


        return(
            <div className="container" >
                <div className="janela-flutuante">

                    <div className="fechar" onClick={fecharModal}> X </div>

                    <h1>Alugar vestido</h1>

                    


                    <p>Nome do vestido: {vestido.nome_vestido} Codigo: {vestido.cod_vestido}</p>
                    
                    {/*Pasta image dentro da pasta public*/}
                    <img src={`/images/${vestido.cod_vestido}.jpeg`} width="100" />

                    <form className="form-data" onSubmit={handleSubmitAluguel}>

                        <label>
                            Codigo Vestido: 
                            <input type="number"
                                    name="codigo_vestido"
                                    onChange={handleChangeAluguel}
                                    className="input"
                                    value={vestido.cod_vestido}       
                                    required
                                    disabled />
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
                            >Alugar</button>
                    </form>

                </div>
            </div>
        )
    
}