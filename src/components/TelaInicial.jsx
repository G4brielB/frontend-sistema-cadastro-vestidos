import { Link } from "react-router-dom"
import "../styles/TelaInicial.css"



export default props => {

    const vestidos = [{
        codVestido: "3301",
        imagem: "img1",
        nome: "vestido princesa infantil",
        tamanho: "m"
    },
    {
        codVestido: "3302",
        imagem: "img2",
        nome: "vestido Stitch",
        tamanho: "g"
    }]

    console.log(vestidos.map((user) => user.nome  ))

    return(
        <div>
            <header>
                <Link className="link" to={"/cadastro-vestidos"}>+ Cadastrar Vestido</Link>
            </header>
            <section>
                <table>
                    <tr>
                        <th>Codigo do vestido:</th>
                        <th>imagem:</th>
                        <th>nome:</th>
                        <th>Tamanho:</th>
                    </tr>


                    {vestidos.map((user) => {
                        return(
                            <tr Key={user.codVestido}>
                                <td>{user.codVestido}</td>
                                <td>{user.imagem}</td>
                                <td>{user.nome}</td>
                                <td>{user.tamanho}</td>
                                <td><button>Alugar</button></td>
                            </tr>
                        )
                    })}
                
                </table>
            </section>
        </div>
    )
}