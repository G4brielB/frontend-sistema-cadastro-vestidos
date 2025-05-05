import '../styles/AlugarVestido.css'
import TelaInicial from "./TelaInicial"

export default ({mostrar, vestido}, ...props) => {

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

                    <form className="form-data">

                        <label >
                            Nome cliente: 
                            <input type="text"
                                    className="input"
                                    name="nomeCliente" />
                        </label>
                        <br />
                        <label>
                            Endereço: 
                            <input type="text" 
                                    className="input"
                                    name="endereco"
                                    />
                        </label>
                        <br />
                        <label>
                            Telefone:
                            <input type="text" 
                                    className="input"
                                    name="telefone"
                                    />
                        </label>
                        <label className="label-data">
                        Data de entrega do vestido:
                            <input type="date" 
                            className="input-data input"
                            name="dataRetirada"
                            />
                        </label>
                        <br />
                        <label className="label-data">
                        Data de devolução do vestido:
                            <input type="date" 
                            name="dataDevolucao"
                            className="input-data input"
                            />
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