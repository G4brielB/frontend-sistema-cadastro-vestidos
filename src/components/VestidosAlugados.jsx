import "../styles/VestidosAlugados.css"
import { buscarDadosAluguel } from "../api/Api"
import { useState, useEffect } from 'react'
import {format, parseISO} from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default props => {

    

    const [locadores, setLocadores] = useState([]);
    const [dataRetirada, setDataRetirada] = useState([]);


    useEffect(() => {
        async function carregarLocadores() {
            try{
                const response = await buscarDadosAluguel()
                setLocadores(response)
                }
            catch(erro){
                console.error("error: ", erro.message)
            }
        }
        carregarLocadores()
    }, [])

    const formatarData= (dataISO) => {
        return format(parseISO(dataISO), 'dd/MM/yyyy', {locale: ptBR})
    }



    return(
        <div>
            <h1>Locadores</h1>
            <section className="card">
                {
                locadores.map((locador) => {
                    return(
                        <div className="info-pessoa" key={locador.id}>
                            <h1>{locador.nome_cliente}</h1>
                            <p>codigo do vestido: {locador.codigo_vestido}</p>
                            <p>telefone: {locador.telefone}</p>
                            <p>endereço: {locador.endereco}</p>
                            <p>data de retirada: {formatarData(locador.data_retirada)}</p>
                            <p>data de devolução: {formatarData(locador.data_devolucao)}</p>
                        </div>
                    )
                })}
            </section>
        </div>
    )
}