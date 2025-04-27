import express from 'express';
import cors from 'cors';
import mysql from "mysql2";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload'

const __filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)


const port = 3001;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(fileUpload())
app.use('/images', express.static(path.join(__dirname, '/images')))

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}))

const conexao = mysql.createConnection({
    host: "127.0.0.1",
    user:"root",
    password:"1234",
    database:"vestido"
})

conexao.connect((erro) => {
    if(erro) throw erro;
    console.log("conectado com sucesso!")
});


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

app.post('/vestidos'/*, upload.single('imagem') */, (req, res) => {

    try{
        const { cod_vestido , nome_vestido} = req.body;
        const imagem = req.files.imagem

        if (!cod_vestido || !nome_vestido) {
            return res.status(400).json({erro: "Codigo e nome são obrigatorios"});
        }

        if(file){
            req.files.imagem.mv(__dirname+'../src/imagens/'+req.files.imagem.name);


            if(err) {
                console.error('Erro ao salvar imagem: ', err);
                return res.status(500).send(err);
            }
        

    
            //let sql = `INSERT INTO vestido.info_vestidos (cod_vestido, nome_vestido, imagem) VALUES ('${cod_vestido}', '${nome_vestido}','${file.filename}')`;

            let sql = `INSERT INTO vestido.info_vestidos (cod_vestido, nome_vestido, imagem) VALUES (?, ?, ?)`;
    
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
        }else{
            let sql = `INSERT INTO vestido.info_vestidos (cod_vestido, nome_vestido) VALUES ('${cod_vestido}', '${nome_vestido}')`;
            
            conexao.query(sql, (erro, resultado) => {
                if(erro){
                    console.error("Erro no MySQL: ", erro);
                    return res.status(500).json({ error: "Erro no servidor" });
                }

                res.status(201).json({
                    success: true,
                    id: resultado.insertId
                })
            })

        }

        }catch(erro){
            console.log('Erro no servidor', erro);
            res.status(500).json({ error: 'Erro interno no servidor' });

        }
}) 

const promiseConnection = conexao.promise();

app.get('/vestidos', async (req,res) => {
    try{
        const [vestidos] = await promiseConnection.query('SELECT * FROM vestido.info_vestidos');

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
    }
})


app.listen(port, () => {
    console.log("Servidor rodando em http://localhost:3001")
})
