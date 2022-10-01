const dbConnection = require('../../config/dbServer');
const connection = dbConnection();

module.exports = {
    getObrasDeArte: (callback) =>{
        let sql = 'select * from fotos;';
        connection.query(sql,callback);
    },

    addFoto: (foto,callback) =>{
        let sql = `insert into fotos (nome, urlfoto, artista) 
        VALUES ("${foto.nome}", "${foto.urlfoto}","${foto.artista}");`
        connection.query(sql, callback);
    }
}