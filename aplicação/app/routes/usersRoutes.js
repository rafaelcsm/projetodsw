
const { check, validationResult } = require('express-validator');
const { addUserController, authUserController } = require('../controllers/users');
const {home} = require('../controllers/home');
const UserController = require("../controllers/users")
module.exports ={
    
    
    
    authUser: (app) => {
        console.log("Rota auth User");
        app.post('/api/authUser', UserController.authUser);
        
    }
    

}