import express from "express";
// const express = require("express")
import fetch from "node-fetch";
import bodyParser from "body-parser";
import config from "./config.js";
import mongoose from "mongoose";

import Comic from "./models/comic.js"
import Comment from "./models/comment.js"

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
        res.send(err);
    })
})

app.post("/comics", (req, res) => {
    const newComic = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre: req.body.genre,
        color: !!req.body.color,
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

// New comment - show form
app.get("/comics/:id/comments/new", (req,res) => {
    res.render("comments_new", {comicId: req.params.id})
})

// Create comment - actually update DB
app.post("/comics/:id/comments", (req, res) => {
    //Create the comment
    Comment.create({
        user: req.body.user,
        text: req.body.text,
        comicId: req.body.comicId
    })
    .then(newComment => {
        console.log(newComment);
        res.redirect(`/comics/${req.body.comicId}`)
    })
    .catch(err => {
        console.log(err);
        res.redirect(`/comics/${req.body.comicId}`)
    })
})


app.get("/comics/new", (req, res) => {
    res.render("comics_new");
});


app.get("/comics/:id", (req, res) => {
    Comic.findById(req.params.id)
    .exec()
    .then((comic) => {
        res.render("comics_show", {comic})
    })
    .catch((err) => {
        res.status(400).send(`Product not found: ${err}`)
    })
})

app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

