import express from "express";
// const express = require("express")
import fetch from "node-fetch";
import bodyParser from "body-parser";
import config from "./config.js";
import mongoose from "mongoose";
import Comic from "./models/comic.js"

const app = express();
const PORT = 3000;

// const mongoose = require("mongoose");

mongoose.connect(config.db.connection)
.then(() => {
    console.log("Successfully connected to the database!")
})
.catch((err) => {
    console.log("Error while connectig: ", err);
    
})


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.render("landing");
})


app.get("/comics", (req, res) => {
    Comic.find()
    .exec()
    .then((foundCoomics) => {
        res.render("comics", {comics:foundCoomics});
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/comics");
    })
})

app.post("/comics", (req, res) => {
    
    const newComic = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image
    }

    Comic.create(newComic)
    .then((comic) => {
        console.log(comic)
        res.redirect("/comics");
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/comics");
    })
})

app.get("/comics/new", (req, res) => {
    res.render("comics_new");
})

app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

