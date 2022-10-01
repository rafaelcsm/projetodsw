
const logger = require('../../config/winstonLogger');
const crypto = require('crypto');
const { addUser, authUser } = require ('../models/users');
const { getTodosConvidadosController } = require('./listaConvidados');

module.exports.addUserController = (app, req, res) =>{
    let user = req.body;
    let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
    user.password = passwordCrypto;
    
    addUser(user, (error, result) => {
        if(error) {
            console.log(error);
            res.end("Erro ao Cadastrar usuario");
        }else{
            getTodosConvidadosController(app,req,res);
            //res.redirect('listaConvidados.ejs');
        }
        
        
    })
}
    module.exports.authUserController = (app, req, res) =>{
        let user = req.body;
        
        //let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
        //user.password = passwordCrypto;
        authUser(user, (error, result) => {
            if(error) {
                res.end("Erro ao autenticar usuario");
            }else{
                
                if(result.length >0 ){
                    req.session.userName = user.email;
                    req.session.loggedIn = true;
                    getTodosConvidadosController(app,req,res);
                    //res.render('listaConvidados.ejs');
                }else{
                    res.end("Usuario não autenticado");
                }
            }
            
        })
    }
