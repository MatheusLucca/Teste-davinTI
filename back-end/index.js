const express = require("express");
const app = express();
const port = 8000;
const router = require("./routers/index");
const conexao = require("./infra/conexao");
const tabelas = require("./infra/tabelas");


router(app, express);
tabelas.init(conexao);

app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
        return;
    }
    console.log("Server running on port", port);
})