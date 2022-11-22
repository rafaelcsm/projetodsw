const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');


module.exports = class ConvidadosModel {
    static async getAllConvidados() {
        console.log('getAllConvidados Model');
        const cursor = await client.db("ProjetoDSW").collection("convidados").find();
        const convidados = await cursor.toArray();
        console.log(`Convidados model >> ${convidados}`);
        return convidados;
    }
    
    static async getConvidadoById(idConvidado) {
        idConvidado = new ObjectId(idConvidado);
        const convidado = await client.db("ProjetoDSW").collection("convidados").findOne({_id: idConvidado });
        return convidado;
    }

    static async addConvidado(Convidado){
        try{
            const novoConvidado = {nome: Convidado.nome, emailConvidado: Convidado.emailConvidado, status: 1};
            const convidadoAdd = await client.db("ProjetoDSW").collection("convidados").insertOne(novoConvidado);
            return convidadoAdd;
        }catch(error){
            console.log(`[addConvidado] Error: ${error}`)
        }
    }

}