// NPM Imports
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import mongoose from "mongoose";

// Config Import
import config from "./config.js";

// Model Imports
import Comic from "./models/comic.js"
import Comment from "./models/comment.js"

// Routes Imports
import comicRoutes from "./routes/comics.mjs";
import commentRoutes from "./routes/comments.mjs";
import mainRoutes from "./routes/main.mjs"

const app = express();
const PORT = 3000;

// Connect to DB
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


// Use Comics Routes
app.use("/",mainRoutes)
app.use("/comics",comicRoutes)
app.use("/comics/:id/comments",commentRoutes)


app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

