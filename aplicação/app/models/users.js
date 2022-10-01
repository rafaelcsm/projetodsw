const dbConnection = require('../../config/dbServer');
const connection = dbConnection();


module.exports = {
    addUser: (user, callback) => {
        
        sql = `insert into users (email, password) 
        VALUES ("${user.email}", "${user.password}");`
        connection.query(sql, callback);
        console.log("depois de inserir");

    },
    authUser: (user, callback) => {
        
        sql = `select * from users where email = "${user.email}" and password = "${user.password}";`
        connection.query(sql, callback);

    }
}