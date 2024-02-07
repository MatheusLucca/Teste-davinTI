const express = require("express");
const cors = require("cors");
const app = express();
const config = require("config");
const appCustom = require("./config/appCustom");

app.use(cors());
appCustom(app, express);


app.listen(config.get("port"), (error) => {
    if (error) {
        console.log("Error running the server");
        return;
    }
    console.log("Server running on port", config.get("port"));
})