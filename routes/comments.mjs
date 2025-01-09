import express from "express";
const router = express.Router({mergeParams: true});
import Comment from "../models/comment.js";
import Comic from "../models/comic.js";
import req from "express/lib/request.js";


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

        console.log("Comic:", comic);
        console.log("Comment:", comment);

        res.render("comments_edit", {comic, comment});
    }catch (err) {
        console.log(err);
        res.send("Broke Comment Edit GET");
    }
})


// Update Comment - update in DB
router.put("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text:req.body.text}, {new:true})
        console.log(comment);
        res.redirect(`/comics/${req.params.id}`);
    } catch(err) {
        console.log(err);
        res.send("Brokeeeeeee comment PUT");
    }
})


// Delete comment
router.delete("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        console.log(comment);
        res.redirect(`/comics/${req.params.id}`);
        
    } catch (err) {
        console.log(err);
        res.send("Broken comment DELETE")
    }
})

export default router;