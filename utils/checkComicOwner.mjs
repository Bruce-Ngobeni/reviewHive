import Comic from "../models/comic.js";


const checkComicOwner = async (req, res, next) => {

    if (req.isAuthenticated()) {
        const comic = await Comic.findById(req.params.id).exec();

        if (comic.owner.id.equals(req.user._id)) {
            next()
        } else {
            req.flash("error", "Not permitted to do that!");
            res.redirect("back");
        }

    } else {
        req.flash("error", "Must be logged in!");
        res.redirect("/login");

    }
}



export default checkComicOwner;