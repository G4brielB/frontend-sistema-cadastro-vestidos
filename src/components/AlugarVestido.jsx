import '../styles/AlugarVestido.css'

export default ({mostrar}, ...props) => {

    const fecharJanela = () => {
        mostrar = null
    }
    
    if(!mostrar) return null


        return(
            <div className="container">
                <div className="janela-flutuante">

                    <h1>Alugar vestido</h1>

                    <p>Nome do vestido: {}</p>
                    <p>Codigo do vestido: {}</p>

                    <form className="form-data">

                        <label >
                            Nome cliente: 
                            <input type="text"
                                    className="input" />
                        </label>
                        <br />
                        <label>
                            Endereço: 
                            <input type="text" 
                                    className="input"/>
                        </label>
                        <br />
                        <label>
                            Telefone:
                            <input type="text" 
                                    className="input" />
                        </label>
                        <label className="label-data">
                        Data de entrega do vestido:
                            <input type="date" 
                            name="data_entrega"
                            className="input-data input"
                            />
                        </label>
                        <br />
                        <label className="label-data">
                        Data de devolução do vestido:
                            <input type="date" 
                            name="data_devolucao"
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