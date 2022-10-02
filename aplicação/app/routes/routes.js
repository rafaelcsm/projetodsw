const { check, validationResult } = require('express-validator');
const { formatWithOptions } = require('util');
const {home} = require('../controllers/home');
const { getTodosConvidadosController, addConvidadoController, detalheConvidadoController } = require('../controllers/listaConvidados');

module.exports = {
    home: (app) => {
        app.get('/', (req,res) =>{
            home(app,req,res);
        });
    },
    inserirConvidado: (app) =>{
        app.get('/inserirConvidado', (req,res) =>{
            res.render('infoConvidado.ejs',{erro:{}, convidado: {}});
        })
    },
    addConvidado: (app) =>{
        app.post('/addConvidado',
            [
                check('nome').isLength({min: 5}).withMessage('O nome deve possuir pelo menos 5 caracteres'),
                check('emailConvidado').isEmail().normalizeEmail().withMessage('Email Inválido'),
            ],
            (req,res) => {
                const validation = validationResult(req);
                if(!validation.isEmpty()){
                    let erro = validation.array();
                    let convidado = req.body
                    console.log(erro);
                    res.render('infoConvidado.ejs', { erro: erro, convidado: convidado});
                    return;
                }else{
                    addConvidadoController(app,req,res);
                }
            })
    },
    getListaConvidados: (app) =>{
        app.get('/listaDeConvidados',(req,res) =>{
            getTodosConvidadosController(app,req,res);
        })
    },
    getConvidado: (app) =>{
        app.get('/detalheConvidado',(req,res)=>{
            detalheConvidadoController(app,req,res);
        })
    }
};