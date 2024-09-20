import express from "express";
// const express = require("express")
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/comics", (req, res) => {
    res.render("comics")
})


app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

