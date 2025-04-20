import { Link } from "react-router-dom";
import "../styles/TelaInicial.css";
import {buscarDados} from "../api/Api";
import {useState, useEffect} from 'react';



export default props => {

    const [dados, setDados] = useState([]);

    useEffect(() => {
        async function carregarDados(){
            try{
                const response = await buscarDados();
                setDados(response.data);
                console.log(response.data)
            }catch(erro){
                console.log(erro);
            }
        };
        carregarDados();
    },[])

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

    return(
        <div>
            <header>
                <Link className="link-cadastro" to={"/cadastro-vestidos"}>+ Cadastrar Vestido</Link>
            </header>
            <section>
                <table>
                    <tr>
                        <th>Codigo do vestido:</th>
                        <th>imagem:</th>
                        <th>nome:</th>
                        
                    </tr>


                    {dados.map((user) => {
                        return(
                            <tr Key={user.cod_vestido}>
                                <td>{user.cod_vestido}</td>
                                <td>{user.imagem}</td>
                                <td>{user.nome_vestido}</td>
                                
                                <td><button>Alugar</button></td>
                            </tr>
                        )
                    })}
                
                </table>
            </section>
        </div>
    )
}