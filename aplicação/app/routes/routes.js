const { formatWithOptions } = require('util');
const {home, addFoto} = require('../controllers/home');
const { getTodosConvidadosController } = require('../controllers/listaConvidados');

module.exports = {
    home: (app) => {
        app.get('/', (req,res) =>{
            home(app,req,res);
        });
    },
    inserirConvidado: (app) =>{
        app.get('/inserirfoto', (req,res) =>{
            res.render('novaFoto.ejs');
        })
    },
    addConvidado: (app) =>{
        app.post('/addObra',(req,res) =>{
            let foto = req.body;
            
            addFoto(app,req,res);
        })
    },
    getListaConvidados: (app) =>{
        app.get('/listaDeConvidados',(req,res) =>{
            getTodosConvidadosController(app,req,res);
        })
    }
};