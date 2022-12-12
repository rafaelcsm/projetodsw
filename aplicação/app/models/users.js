
const client = require('../../config/dbConnection');
const { ObjectId } = require('mongodb');

module.exports = class UsersModel {
    static async authUser(email, senha) {
        //movieId = new ObjectId(movieId);
        const user = await client.db("ProjetoDSW").collection("users").findOne({email: email, password: senha });
        return user;
    }
}