
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
        }
        
        
    })
}
    module.exports.authUserController = (app, req, res) =>{
        let user = req.body;
        console.log(user);
        //let passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex');
        //user.password = passwordCrypto;
        authUser(user, (error, result) => {
            if(error) {
                let erro = {};
                if(error.errno == 1045){
                    erro.mensagem = "A senha do banco de dados está incorreta";
                    erro.codigo = 1045;
                    logger.log({
                        level: 'bancoDeDados',
                        message: error.sqlMessage
                    });
                    res.render('errorView', {erro: erro})
                }else{
                    erro.mensagem = "Tivemos um problema ao autenticar seu usuário";
                    erro.codigo = 0000;
                    logger.log({
                        level: 'desconhecido',
                        message: error.code
                    });
                }
                res.render('errorView', {erro: erro})
                /*res.end("Erro ao autenticar usuario");*/
                console.log(error);
            }else{
                
                if(result.length >0 ){
                    req.session.userName = user.email;
                    req.session.loggedIn = true;
                    getTodosConvidadosController(app,req,res);
                }else{
                    let error = {};  
                    error.code = "Acesso não autorizado";
                    
                    logger.log({
                        level: 'autenticação',
                        message: error.message
                    });
                    res.render('errorView', {erro: error})
                }
            }
            
        })
    }
