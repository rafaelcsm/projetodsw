
const {addConvidado} = require('../models/home');


module.exports.home = (app,req,res) =>{
    
    res.render('home.ejs');
}


module.exports.acessoAdm = (app,req,res) =>{
    res.render('loginAdm.ejs');
}