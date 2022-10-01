
const {addConvidado} = require('../models/home');


module.exports.home = (app,req,res) =>{
    
    res.render('home.ejs');
    
    
}

module.exports.addConvidado = (app,req,res) =>{
    let foto = req.body;
    addConvidado(foto,(error,result) =>{
        console.log("log erro:",error);
        res.redirect('/');
    });
    
}

module.exports.acessoAdm = (app,req,res) =>{
    res.render('loginAdm.ejs');
}