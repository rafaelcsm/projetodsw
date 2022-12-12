const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');


module.exports = class ConvidadosModel {
    static async getAllConvidados() {
        const cursor = await client.db("ProjetoDSW").collection("convidados").find();
        const convidados = await cursor.toArray();
        return convidados;
    }
    
    static async getConvidadoById(idConvidado) {
        idConvidado = new ObjectId(idConvidado);
        const convidado = await client.db("ProjetoDSW").collection("convidados").findOne({_id: idConvidado });
        return convidado;
    }

    static async addConvidado(Convidado){
        try{
            const novoConvidado = {nome: Convidado.nome, emailConvidado: Convidado.emailConvidado, status: "convidado", nroAcompanhantes: Convidado.nroAcompanhantes};
            const convidadoAdd = await client.db("ProjetoDSW").collection("convidados").insertOne(novoConvidado);
            return convidadoAdd;
        }catch(error){
            console.log(`Erro ao adicionar convidado: ${error}`)
        }
    }

    static async editarConvidado(idConvidado,Convidado){
        idConvidado = new ObjectId(idConvidado);
        try{
            const convidado = await client.db("ProjetoDSW").collection("convidados").findOneAndUpdate({_id: idConvidado},{ $set:Convidado});
            return convidado;
        }catch(error){
            console.log("Erro ao editar as informações do convidado: ", error);

        }
    }

    static async removerConvidado(idConvidado){
        idConvidado = new ObjectId(idConvidado);
        try{
            const convidado = await client.db("ProjetoDSW").collection("convidados").findOneAndDelete({_id: idConvidado});
            return convidado;
        }catch(erro){
            console.log("Erro ao remover o convidado de Id: ", idConvidado);
        }
    }

    static async alterarStatusConvidado(idConvidado,status){
        idConvidado = new ObjectId(idConvidado);
        try{
            const statusC = await client.db("ProjetoDSW").collection("convidados").updateOne({_id: idConvidado},{$set: status});
            return statusC;
        }catch(error){
            console.log("Erro ao atualizar o status do convidado: ",error);
        }
    }

    static async removerTodosOsConvidados(){
        try{
            const convidados = await client.db("ProjetoDSW").collection("convidados").deleteMany();
            return convidados;
        }catch(error){
            console.log("Erro ao remover todos os convidados: ",error);
        }

    }

}