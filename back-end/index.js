const express = require("express");
const app = express();
const config = require("config");
const appCustom = require("./config/appCustom");

appCustom(app, express);


app.listen(config.get("port"), (error) => {
    if (error) {
        console.log("Error running the server");
        return;
    }
    console.log("Server running on port", config.get("port"));
})