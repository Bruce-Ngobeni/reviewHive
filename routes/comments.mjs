import express from "express";
const router = express.Router({mergeParams: true});
import Comment from "../models/comment.js";


// New comment - show form
router.get("/new", (req,res) => {
    res.render("comments_new", {comicId: req.params.id})
})

// Create comment - actually update DB
router.post("/", (req, res) => {
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


export default router;