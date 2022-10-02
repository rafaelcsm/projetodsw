const { formatWithOptions } = require('util');
const {home} = require('../controllers/home');
const { getTodosConvidadosController, addConvidadoController } = require('../controllers/listaConvidados');

module.exports = {
    home: (app) => {
        app.get('/', (req,res) =>{
            home(app,req,res);
        });
    },
    inserirConvidado: (app) =>{
        app.get('/inserirConvidado', (req,res) =>{
            res.render('infoConvidado.ejs',{errors:{}, convidado: {}});
        })
    },
    addConvidado: (app) =>{
        app.post('/addConvidado',(req,res) =>{
            addConvidadoController(app,req,res);
        })
    },
    getListaConvidados: (app) =>{
        app.get('/listaDeConvidados',(req,res) =>{
            getTodosConvidadosController(app,req,res);
        })
    },
    getConvidado: (app) =>{
        app.get('/detalheConvidado',(req,res))
    }
};