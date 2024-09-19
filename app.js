import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");



app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

