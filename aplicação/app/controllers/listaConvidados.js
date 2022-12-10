const ConvidadosModel = require('../models/listaConvidados');
const jwt = require('jsonwebtoken');
const SECRET = 'autenticar';
const joi = require('joi');
const { json } = require('express');

/*function autenticacao(req,res){
    try{
        const token = req.headers['x-access-token']
        
        jwt.verify(token,SECRET, (err, decoded) =>{
            if(err){
                throw new Error("Usuario não autorizado, autenticação necessária.");
            } 
            req.userId = decoded.userId;
           
            
        });
    }catch(error){
        res.status(401).json(error.message);
        return;
    };
}
*/
module.exports = class ConvidadosController{
    static async getTodosConvidadosController (req,res, next){
        try{
            const token = req.headers['x-access-token']
            
            jwt.verify(token,SECRET, (err, decoded) =>{
                if(err){
                    throw new Error("Usuario não autorizado, autenticação necessária.");
                } 
                req.userId = decoded.userId;
               
                
            });
        }catch(error){
            res.status(401).json(error.message);
            return;
        };
        try{
            const convidados = await ConvidadosModel.getAllConvidados();
            if(!convidados){
                res.status(400).json("Não há nenhum convidado na lista.");
                return;
            }
            res.status(200).json(convidados);
        }catch(error){
            console.log(error);
            res.status(500).json({error: error});
        }
    }

    static async getConvidadoById(req,res,next){
        try{
            const convidado = await ConvidadosModel.getConvidadoById(req.params.id);
            if(!convidado){
                res.status(400).json("Não foi encontrado nenhum convidado com este código");
                return;
            }
            res.status(200).json(convidado);
        }   catch(error){
            res.status(500).json({error: error});
        }
    }

    static async addConvidado (req,res,next){
        try{
            const token = req.headers['x-access-token']
            
            jwt.verify(token,SECRET, (err, decoded) =>{
                if(err){
                    throw new Error("Usuario não autorizado, autenticação necessária.");
                } 
                req.userId = decoded.userId;
               
                
            });
        }catch(error){
            res.status(401).json(error.message);
            return;
        };
        //validar os campos do body usando o JOI
        try{
            const convidado = await ConvidadosModel.addConvidado(req.body);
            console.log("convidado inserido: ", convidado);
            res.status(200).json(convidado);
        }catch(error){
            res.status(500).json(error);
        }
    }

    static async editarConvidado(req,res,next){
        try{
            const token = req.headers['x-access-token']
            
            jwt.verify(token,SECRET, (err, decoded) =>{
                if(err){
                    throw new Error("Usuario não autorizado, autenticação necessária.");
                } 
                req.userId = decoded.userId;
               
                
            });
        }catch(error){
            res.status(401).json(error.message);
            return;
        };
        try{
            const convidado = await ConvidadosModel.editarConvidado(req.params.id,req.body);
            console.log("convidado editado: ", convidado);
            if(convidado.value == null){
                throw new Error("Não foi possivel editar as informações deste convidado");
            }
            res.status(200).json(convidado.value);
        }catch(error){
            res.status(500).json({error: error});
        }

    }

    static async removerConvidado(req,res,next){
        try{
            const token = req.headers['x-access-token']
            
            jwt.verify(token,SECRET, (err, decoded) =>{
                if(err){
                    throw new Error("Usuario não autorizado, autenticação necessária.");
                } 
                req.userId = decoded.userId;
               
                
            });
        }catch(error){
            res.status(401).json(error.message);
            return;
        };
        try{
            const convidado = await ConvidadosModel.removerConvidado(req.params.id);
            console.log("Remover convidado: ", convidado);
            if(convidado.value == null){
                throw new Error("Erro ao remover convidado");
            }
            res.status(200).json(convidado);
        }catch(error){
            res.status(500).json({error: error});
        }
    }
    

}
/*const { addConvidado } = require("../models/home");
const { getTodosConvidados, getConvidado } = require("../models/listaConvidados");

module.exports.getTodosConvidadosController = (app,req,res) =>{
    getTodosConvidados((error,result) =>{
        if(error){
            console.log("Erro ao buscar todos os convidados >>> ",error);
            let erro = {}; 
            if(error.errno == 1146){
                erro.mensagem = "A tabela de convidados não foi encontrada";
                erro.codigo = 1146;
                logger.log({
                    level: 'bancoDeDados',
                    message: error.sqlMessage
                });
            }else if(error.errno == 1045){
                erro.mensagem = "A senha do banco de dados está incorreta";
                erro.codigo = 1045;
                logger.log({
                    level: 'bancoDeDados',
                    message: error.sqlMessage
                });
            }
            else{
                erro.mensagem = "Tivemos um problema ao buscar todos os convidados";
                erro.codigo = 0000;
                logger.log({
                    level: 'desconhecido',
                    message: error.code
                });
            }
            res.render('errorView', {erro: erro})
        }else{
            res.render('listaConvidados.ejs', {convidados: result});
        }
        
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
module.exports.detalheConvidadoController = (app,req,res) =>{
    let convidado = req.query;
    getConvidado(convidado.idConvidado,(error,result) =>{
        if(error){
            console.log(error);
        }else{
            res.render('infoConvidado',{erro: {}, convidado: result[0]});
        }
    })
}
*/