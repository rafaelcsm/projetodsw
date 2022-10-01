
const {getObrasDeArte,addFoto} = require('../models/home');


module.exports.home = (app,req,res) =>{
    getObrasDeArte((error,result) =>{
        res.render('home.ejs', {foto: result});
    });
    
}

module.exports.addFoto = (app,req,res) =>{
    let foto = req.body;
    addFoto(foto,(error,result) =>{
        console.log("log erro:",error);
        res.redirect('/');
    });
    
}

module.exports.acessoAdm = (app,req,res) =>{
    res.render('loginAdm.ejs');
}