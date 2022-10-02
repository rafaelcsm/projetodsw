const { addConvidado } = require("../models/home");
const { getTodosConvidados } = require("../models/listaConvidados");

module.exports.getTodosConvidadosController = (app,req,res) =>{
    getTodosConvidados((error,result) =>{
        console.log(result);
        res.render('listaConvidados.ejs', {convidados: result});
    });
}
module.exports.addConvidadoController = (app,req,res) =>{
    let convidado = req.body;
    console.log(convidado)
    convidado.status = "Convidado";
    addConvidado(convidado,(error,result) =>{
        console.log("Resultado da inserção >>> ",result);
        console.log("Erro ao inserir >>> ",error);
        res.redirect('/');
    })
}
