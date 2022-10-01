const { getTodosConvidados } = require("../models/listaConvidados");

module.exports.getTodosConvidadosController = (app,req,res) =>{
    getTodosConvidados((error,result) =>{
        console.log("Controller listaConvidados");
        console.log(result);
        res.render('listaConvidados.ejs', {convidados: result});
    });
    
}
