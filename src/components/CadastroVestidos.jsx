import "../styles/CadastroVestidos.css"
import { Link } from "react-router-dom"
import { cadastrarVestido } from '../api/Api'
import {useState} from 'react'

export default props => {


    const [formData, setFormData] = useState({
        cod_vestido: '',
        nome_vestido: '',
        imagem: null
    })

    const handleChange = (e) => {
        if (e.target.name === 'img_vestido') {
            setFormData({
                ...formData,
                imagem: e.target.files[0]
            });
        }else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await cadastrarVestido({
                cod_vestido: formData.cod_vestido,
                nome_vestido: formData.nome_vestido,
                imagem: formData.imagem
            });
            alert('Vestido cadastrado com sucesso!');
            setFormData({
                cod_vestido: '',
                nome_vestido: '',
                imagem: null
            })
        }catch(erro){
            console.error('Erro ao cadastrar vestido: ', erro);
            alert('Erro ao cadastrar vestido');
        }
    }


    return(
        <div className="cadastro">
            <Link className="link" to={"/"}>Inicio</Link>
            <div className="tela-cadastro">
                <form onSubmit={handleSubmit} className="form-cadastro">
                    <h1>Cadastro de Vestidos</h1>

                    <input
                    className="input" 
                    type="number" 
                    name="cod_vestido" 
                    placeholder="digite o codigo do vestido"
                    value={formData.cod_vestido}
                    onChange={handleChange} required/>

                    <input 
                    className="input" 
                    type="text" 
                    name="nome_vestido" 
                    placeholder="digite o nome do vestido"
                    value={formData.nome_vestido}
                    onChange={handleChange} required/>

                    {/*<label className="input-file">Adicione imagem do vestido
                        <input 
                        type="file" 
                        name="imagem" 
                        onChange={handleChange}
                        accept="image/*"/>
                    </label>*/} 
                    <button type="submit" className="cadastrar">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}