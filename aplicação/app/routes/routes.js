const { formatWithOptions } = require('util');
const {home, addFoto} = require('../controllers/home');

module.exports = {
    home: (app) => {
        app.get('/', (req,res) =>{
            home(app,req,res);
        });
    },
    inserirFoto: (app) =>{
        app.get('/inserirfoto', (req,res) =>{
            res.render('novaFoto.ejs');
        })
    },
    addFoto: (app) =>{
        app.post('/addObra',(req,res) =>{
            let foto = req.body;
            console.log("objeto foto rota: ",foto);
            addFoto(app,req,res);
        })
    }
};