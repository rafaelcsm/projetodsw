const dbConnection = require('../../config/dbServer');
const connection = dbConnection();


module.exports = {
    getTodosConvidados: (callback) =>{
        let sql = 'select * from convidados;';
        connection.query(sql,callback);
    },
    getConvidado: (idConvidado, callback) =>{
        let sql = `select * from convidados c where c.idConvidado = ${idConvidado};`;
        connection.query(sql,callback);

    }
}