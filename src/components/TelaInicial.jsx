import { Link } from "react-router-dom";
import "../styles/TelaInicial.css";
import {buscarDados, deletarVestido} from "../api/Api";
import {useState, useEffect} from 'react';
import AlugarVestido from "./AlugarVestido";
import VestidosAlugados from "./VestidosAlugados"



export default (props) => {

    


    const [mostrarAluguel, setMostrarAluguel] = useState(null)
    const [vestidos, setVestidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vestidoParaAlugar, setVestidoParaAlugar] = useState(null);

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

    const fecharModal = () => {
        setMostrarAluguel(null)
    }

    const handleRemoverVestido = async (id) => {
        if(!window.confirm("Tem certeza que deseja remover este vestido?")){
            return
        }
        
        try{

            const vestidosAtualizados = vestidos.filter(v => v.id_vestido !== id)
            setVestidos(vestidosAtualizados)

            const response = await deletarVestido(id)

            if(!response.success) {
                throw new Error("Falha na confirmação do servidor")
            }

            alert('Vestido Removido com sucesso!')
        }catch(erro){
            console.error("Erro", erro)
        }
    }

    return(
        <div>
            <AlugarVestido mostrar={mostrarAluguel} vestido={vestidoParaAlugar} onFechar={fecharModal} />
            <header>
                <Link className="link-cadastro" to={"/cadastro-vestidos"}>+ Cadastrar Vestido</Link>
            </header>
            <section class="container-vestidos">
                <table>
                    <tr>
                        <th>Codigo do vestido:</th>
                        <th>Nome:</th>
                        <th>Alugar:</th>
                        <th>Remover:</th>
                        
                    </tr>


                    {vestidos.map((vestido) => {
                        return(
                            <tr Key={vestido.id_vestido}>
                                <td>{vestido.cod_vestido}</td>
                                
                                <td>{vestido.nome_vestido}</td>
                                
                                <td><button className='alugar-btn' onClick={() => {
                                    funcMostrarAluguel()
                                    setVestidoParaAlugar(vestido)
                                }}>Alugar</button></td>
                                <td><svg 
                                onClick={() => handleRemoverVestido(vestido.id_vestido)}
                                 xmlns="http://www.w3.org/2000/svg" fill="none" width="30" color="red" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </td>
                            </tr>
                        )
                    })} 
                
                </table>
            </section>

            <section>
                <VestidosAlugados />
            </section>
        </div>
    )
}