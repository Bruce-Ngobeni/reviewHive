// ======================
// IMPORTS
// ======================

// NPM Imports
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import methodOverride from "method-override";
import morgan from "morgan";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import expressSession from "express-session";
import flash from "connect-flash";


// Config Import

// try {

//     const config = require('./config.js');


// } catch (err) {

//     console.log("Could not import config");
//     console.log(err)
    
// }

let config;

try {
    const module = await import('./config.js');
    config = module.default; // Access default export
} catch (err) {
    console.error("Could not import config:", err.message);
}




// Model Imports
import Comic from "./models/comic.js";
import Comment from "./models/comment.js";
import User from "./models/user.js";



// Routes Imports
import comicRoutes from "./routes/comics.mjs";
import commentRoutes from "./routes/comments.mjs";
import mainRoutes from "./routes/main.mjs"
import authRoutes from "./routes/auth.mjs";


// ======================
// DEVELOPMENT
// ======================

const app = express();
const PORT = 3000;

// Morgan
app.use(morgan("tiny"));


// Seed the DB
// import seed from "./utils/seed.mjs";
// seed();


// ======================
// CONFIG
// ======================

// Connect to DB

try {

    mongoose.connect(config.db.connection)
    .then(() => {
        console.log("Successfully connected to the database!")
    })
    .catch((err) => {
        console.log("Error while connectig: ", err);

    })
    
} catch (err) {

    console.log("could not connect using config");
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    
}



// Express Config
app.use(express.static("public"));
app.set("view engine", "ejs");


// Express Session Config
app.use(expressSession({
    secret:process.env.ES_SECRET || config.expressSession.secret,
    resave: false,
    saveUninitialized: false
}))


// Body Parser COnfig
app.use(bodyParser.urlencoded({ extended: true }));


// Method Override Config
app.use(methodOverride("_method"));


// Connect Flash
app.use(flash());


// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


// State Config
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    next();
})


// Route Config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/comics", comicRoutes);
app.use("/comics/:id/comments", commentRoutes);


// ======================
// LISTEN
// ======================
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running on port: ", PORT);
})

