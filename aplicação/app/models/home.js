const dbConnection = require('../../config/dbServer');
const connection = dbConnection();

module.exports = {
    
    addConvidado: (convidado,callback) =>{
        let sql = `insert into convidados (nome, emailConvidado, status) 
        VALUES ("${convidado.nome}", "${convidado.emailConvidado}","${convidado.status}");`
        connection.query(sql, callback);
    }
    
}