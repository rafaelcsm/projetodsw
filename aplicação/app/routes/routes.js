const { formatWithOptions } = require('util');
const {home, addConvidadoController} = require('../controllers/home');
const { getTodosConvidadosController } = require('../controllers/listaConvidados');

module.exports = {
    home: (app) => {
        app.get('/', (req,res) =>{
            home(app,req,res);
        });
    },
    inserirConvidado: (app) =>{
        app.get('/inserirConvidado', (req,res) =>{
            res.render('infoConvidado.ejs');
        })
    },
    addConvidado: (app) =>{
        app.post('/addConvidado',(req,res) =>{
            let convidado = req.body;
            
            addConvidadoController(app,req,res);
        })
    },
    getListaConvidados: (app) =>{
        app.get('/listaDeConvidados',(req,res) =>{
            getTodosConvidadosController(app,req,res);
        })
    }
};