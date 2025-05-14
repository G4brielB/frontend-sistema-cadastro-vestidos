import express from 'express';
import cors from 'cors';
import mysql from "mysql2/promise";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)

const networkInfo = os.networkInterfaces();
const ip = networkInfo.lo[0].address


const port = 3001;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(fileUpload())
app.use('/images', express.static(path.join(__dirname, '/images')))

app.use(cors({
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))


const conexao = mysql.createPool({
    host: "127.0.0.1",
    user:"root",
    password:"1234",
    database:"vestido",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})


/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../src/images'))
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + path.extname(file.originalname)
        cb(null, filename)
    }
})

const upload = multer ({ storage: storage})
*/

app.post('/vestidos'/*, upload.single('imagem') */,async (req, res) => {

    let connection

    try{
        connection = await conexao.getConnection();
        const { cod_vestido , nome_vestido} = req.body;
        //const imagem = req.files.imagem

        if (!cod_vestido || !nome_vestido) {
            return res.status(400).json({erro: "Codigo e nome são obrigatorios"});
        }

        /*if(imagem){
            req.files.imagem.mv(__dirname+'../src/imagens/'+req.files.imagem.name);


            if(err) {
                console.error('Erro ao salvar imagem: ', err);
                return res.status(500).send(err);
            }
        

    
            let sql = `INSERT INTO vestido.info_vestidos (cod_vestido, nome_vestido, imagem) VALUES ('${cod_vestido}', '${nome_vestido}','${file.filename}')`;
    
            conexao.query(sql, [cod_vestido, nome_vestido, imagem.name] ,(erro, resultado) => {        
                if(erro) {
                    console.error('Erro no MySQL: ', erro);
                    return res.status(500).json({ error: "Erro no servidor "});
                }

                res.status(201).json({
                    success: true,
                    id: resultado.insertId,
                    imagem: imagem.name
                });
            })
        }*/
            let sql = `INSERT INTO vestido.info_vestidos (cod_vestido, nome_vestido) VALUES ('${cod_vestido}', '${nome_vestido}')`;
            
            connection.query(sql, (erro, resultado) => {
                if(erro){
                    console.error("Erro no MySQL: ", erro);
                    return res.status(500).json({ error: "Erro no servidor" });
                }

                res.status(201).json({
                    success: true,
                    id: resultado.insertId
                })
            })

        

        }catch(erro){
            console.log('Erro no servidor', erro);
            res.status(500).json({ error: 'Erro interno no servidor' });

        }finally{
            if(connection) connection.release();
        }
}) 


app.get('/vestidos', async (req,res) => {
    let connection
    try{
        connection = await conexao.getConnection();
        const [vestidos] = await connection.query('SELECT * FROM vestido.info_vestidos');

        res.json({
            success: true,
            data: vestidos
        })
    }catch(erro){
        console.error('Erro ao buscar vestidos:', erro)
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar vestidos'
        })
    }finally{
        if(connection) connection.release();
    }
})

app.post('/alugueis',async (req, res) => {
    let connection
    try{
        connection = await conexao.getConnection();
        const {codigo_vestido, nomeCliente, telefone, endereco, dataRetirada, dataDevolucao} = req.body

        if(!nomeCliente) {
            return res.status(400).json({error: "Dados incompletos"})
        }

        const [result] = await connection.query(
            `INSERT INTO alugueis (codigo_vestido, nome_cliente, telefone, endereco, data_retirada, data_devolucao) VALUES (?, ?, ?, ?, ?, ?)`,
            [codigo_vestido ,nomeCliente, telefone, endereco, dataRetirada, dataDevolucao]
        )
        res.status(200).json({
                success: true,
                message: "Aluguel registrado com sucesso"
            })
        
    }catch(erro){
        res.status(500).json({error: erro.message})
    }finally{
        if(connection) connection.release();
    }
})

app.get('/alugueis', async (req, res) => {
    let connection
    try{
        connection = await conexao.getConnection();
        const [alugueis] = await connection.query(`
            SELECT * a.*, i.nome as nome_vestido
            FROM alugueis a
            JOIN vestidos v ON a.vestido_id = i.id_vestido`)
            res.json({data: alugueis});

    }catch(erro){
        res.status(500).json({error: erro.message})
    }finally{
        if(connection) connection.release();
    }
})


app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3001")
})
