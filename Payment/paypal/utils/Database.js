const dbconfig = require("../config/db.json");
const mysql2 = require("mysql2");

// const connectDatabase = async () => {
const mysqlDatabase = mysql2.createConnection({
    user: dbconfig.user,
    host: dbconfig.host,
    password: dbconfig.password,
    database: dbconfig.database,
    port: dbconfig.port
});
mysqlDatabase.connect(function (error) {
    if (error) {
        console.log("error while connecting to Database:- " + error);
    } else {
        console.log("successfully connected to database");
    }
});


module.exports = mysqlDatabase;
