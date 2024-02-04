const mysql = require("mysql");

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "teste-davinti",
});

module.exports = conexao;
