const dbConnection = require('../../config/dbServer');
const connection = dbConnection();


module.exports = {
    getTodosConvidados: (callback) =>{
        let sql = 'select * from convidados;';
        connection.query(sql,callback);
    }
}