/*const dbConnection = require('../../config/dbServer');
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
}*/
const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');

module.exports = class UsersModel {
    static async authUser(email, senha) {
        //movieId = new ObjectId(movieId);
        const user = await client.db("ProjetoDSW").collection("users").findOne({email: email, password: senha });
        return user;
    }
}