const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user:String,
    text: String,
    comicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comic"
    }
})


module.exports = mongoose.model("Comment", commentSchema);;