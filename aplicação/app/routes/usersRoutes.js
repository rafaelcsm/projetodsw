
const { check, validationResult } = require('express-validator');
const { addUserController, authUserController } = require('../controllers/users');
const {home} = require('../controllers/home');

module.exports ={
    
    
    authUserForm: (app) =>{
        app.get('/administrador', function (req, res){
            
            res.render('loginAdm.ejs', {error: {}, user: {}});
        })
    },
    authUser: (app) => {
        app.post('/authUser', 
        [
            check('email').isEmail().normalizeEmail().withMessage('Email Inválido'),
            
        ],
        (req,res) => {
            const validation = validationResult(req);
            if(!validation.isEmpty()){
                let errors = validation.array();
                let user = req.body
                console.log(errors);
                res.render('loginAdm.ejs', { error: errors, user: user});
                return;
            }else{
                authUserController(app, req, res);
            }
            
        });
    },
    encerraSessao: (app) =>{
        app.get('/encerrar', (req, res) => {
            req.session.destroy();
            home(app, req, res);
        });
    },

}