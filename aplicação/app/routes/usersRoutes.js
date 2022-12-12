
const UserController = require("../controllers/users")
module.exports ={
    
    
    
    authUser: (app) => {
        console.log("Rota auth User");
        app.post('/api/authUser', UserController.authUser);
        
    }
    

}