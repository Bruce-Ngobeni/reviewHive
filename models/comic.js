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

// const newComic = new Comic({
//     title: "Add title",
//     description: "Add description",
//     image: "Add image"
// })

module.exports = Comic;