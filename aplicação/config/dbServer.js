const mysql = require('mysql');


const host = 'localhost';
const user = 'root';
const password = 'amlabs';
const database = 'projeto';

module.exports = () =>{
    
    return dbConn = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
        }
    );
}