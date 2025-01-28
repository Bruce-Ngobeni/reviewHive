import express from "express";
const router = express.Router({ mergeParams: true });
import Comment from "../models/comment.js";
import Comic from "../models/comic.js";
import isLoggedIn from "../utils/isLoggedIn.mjs";
import checkCommentOwner from "../utils/checkCommentOwner.mjs"


// New comment - show form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("comments_new", { comicId: req.params.id })
})


// Create comment - actually update DB
router.post("/", isLoggedIn, async (req, res) => {

    try {
        //Create the comment
        const comment = await Comment.create({
            user: {
                id: req.user._id,
                username: req.user.username
            },
            text: req.body.text,
            comicId: req.body.comicId
        })

        req.flash("success", "Comment successfully created!")
        res.redirect(`/comics/${req.body.comicId}`)

    } catch (err) {
        req.flash("error", "Error creating comment")
        res.redirect(`/comics/${req.body.comicId}`)
    }
})


// Edit Comment
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {

    try {
        const comic = await Comic.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();

        res.render("comments_edit", { comic, comment });
    } catch (err) {
        console.log(err)
        res.send("You broke it");
    }
})


// Update Comment - update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.commentId, { text: req.body.text }, { new: true })
        
        req.flash("success", "Successfully edited comment!")
        res.redirect(`/comics/${req.params.id}`);
    } catch (err) {
        
        res.redirect("/comics");
    }
})


// Delete comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        req.flash("success", "Comment deleted successfully!")
        res.redirect(`/comics/${req.params.id}`);

    } catch (err) {
        console.log(err);
        req.flash("error", "Error deleting comment!")
        res.redirect("/comics")
    }
})






export default router;