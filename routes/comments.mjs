import express from "express";
const router = express.Router({mergeParams: true});
import Comment from "../models/comment.js";
import req from "express/lib/request.js";
import Comic from "../models/comic.js";
import comment from "../models/comment.js";


// New comment - show form
router.get("/new", (req,res) => {
    res.render("comments_new", {comicId: req.params.id})
})


// Create comment - actually update DB
router.post("/", async (req, res) => {

    try {
        //Create the comment
        const comment = await Comment.create({
            user: req.body.user,
            text: req.body.text,
            comicId: req.body.comicId
        })

        console.log(comment);
        res.redirect(`/comics/${req.body.comicId}`)

    }catch(err) {
        console.log(err);
        res.redirect(`/comics/${req.body.comicId}`)
    }
})


// Edit Comment
router.get("/:commentId/edit", async (req, res) => {

    try{
        const comic = await Comic.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();

        res.render("comments_edit", {comic, comment});
    }catch (err) {
        console.log(err);
        res.send("Broke Comment Edit GET");
    }
})


export default router;