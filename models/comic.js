const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    publisher: String,
    date: Date,
    series: String,
    issue: Number,
    genre: String,
    color: Boolean,
    image: String
})

const Comic = mongoose.model("comic", comicSchema);


module.exports = Comic;