const ConvidadosModel = require('../models/listaConvidados');
const jwt = require('jsonwebtoken');
const SECRET = 'autenticar';
const joi = require('joi');
const { json } = require('express');

const modeloConvidado = joi.object().keys({
    nome: joi.string().required().min(3).max(100),
    emailConvidado: joi.string().required().email(),
    status: joi.string().required().min(1).max(10),
    nroAcompanhantes:joi.number().required().min(0).max(4)
});

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
        const {error,result} = modeloConvidado.validate(req.body);
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
        if(error){
            const result = {
                mensagem: 'Os dados do convidado não foram preenchidos corretamente',
                error: error.details
            }
            res.status(404).json(result);
            return;
        }
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

    static async alterarStatusConvidado(req,res,next){
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
            const convidado = await ConvidadosModel.alterarStatusConvidado(req.params.id,req.body);
            console.log("status editado: ", convidado);
            if(convidado.modifiedCount == 0){
                throw new Error("Não foi possivel editar as informações deste convidado");
            }
            res.status(200).json(convidado);
        }catch(error){
            res.status(500).json({error: error});
        }

    }

    static async removerTodosOsConvidados(req,res,next){
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
            const convidado = await ConvidadosModel.removerTodosOsConvidados();
            console.log("Remoção dos Convidados: ", convidado);

            if(convidado.deletedCount == 0){
                res.status(204).json('Nenhum convidado foi apagado');
                return;
            }
            res.status(200).json(convidado);
        }catch(error){
            res.status(500).json({error: error});
        }

    }
}