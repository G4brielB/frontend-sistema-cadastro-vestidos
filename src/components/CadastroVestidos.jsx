import "../styles/CadastroVestidos.css"

export default props => {

    return(
        <div className="tela-cadastro">
            <form action="/vestidos" method="post">
                <h1>Cadastro de Vestidos</h1>
                <input className="input" type="text" name="nome" placeholder="digite o nome do vestido"/>
                <input className="input" type="number" name="cod_vestido" placeholder="digite o codigo do vestido" />
                <label className="input-file">Adicione imagem do vestido
                    <input type="file" name="img_vestido" />
                </label>
                <button type="button" className="cadastrar">Cadastrar</button>
            </form>
        </div>
    )
}