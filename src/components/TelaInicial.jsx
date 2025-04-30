import { Link } from "react-router-dom";
import "../styles/TelaInicial.css";
import {buscarDados} from "../api/Api";
import {useState, useEffect} from 'react';
import AlugarVestido from "./AlugarVestido";



export default props => {


    const [mostrarAluguel, setMostrarAluguel] = useState(null)
    const [vestidos, setVestidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function carregarVestidos(){
            try{
                const dados = await buscarDados()
                setVestidos(dados)
            }catch(erro){
                setError(erro.message)
            } finally {
                setLoading(false)
            }
        }
        carregarVestidos()
    },[]) 

    //if (loading) return(<div>Carregando...</div>)
    //if (error) return(<div>Erro: {error}</div>)

    const funcMostrarAluguel = () => {
        setMostrarAluguel(true)
    }

    return(
        <div>
            <AlugarVestido mostrar={mostrarAluguel} />
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


                    {vestidos.map((vestido) => {
                        return(
                            <tr Key={vestido.id_vestido}>
                                <td>{vestido.cod_vestido}</td>
                                <td>{vestido.imagem}</td>
                                <td>{vestido.nome_vestido}</td>
                                
                                <td><button onClick={() => {
                                    funcMostrarAluguel()
                                }}>Alugar</button></td>
                            </tr>
                        )
                    })} 
                
                </table>
            </section>
        </div>
    )
}