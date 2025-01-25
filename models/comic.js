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
    image: String,
    //Association - associating comics with users like we did, associating comics and comments
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})


// Add a text index to the schema to enable text search on all fields
comicSchema.index({
    "$**": "text"
});

const Comic = mongoose.model("comic", comicSchema);


module.exports = Comic;