const mysql = require('mysql2');

//Connect to DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ang3lOfDarkness0!',
    database: process.env.DB_NAME,
});

module.exports = connection;