const express = require("express");
const app = express();
const port = 8000;

app.listen(port, (error) => {
    if (error) {
        console.log("Error running the server");
        return;
    }
    console.log("Server running on port", port);
})