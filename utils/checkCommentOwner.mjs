import Comment from "../models/comment.js";
import checkComicOwner from "./checkComicOwner.mjs";


const checkCommentOwner = async (req, res, next) => {

    if (req.isAuthenticated()) {
        const comment = await Comment.findById(req.params.commentId).exec();

        if (comic.user.id.equals(req.user._id)) {
            next()
        } else {
            res.redirect("back")
        }

    } else {
        res.redirect("/login")

    }
}



export default checkComicOwner;