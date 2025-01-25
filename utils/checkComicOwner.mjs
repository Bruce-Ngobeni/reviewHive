import Comic from "../models/comic.js";


const checkComicOwner = async (req, res, next) => {

    if (req.isAuthenticated()) {
        const comic = await Comic.findById(req.params.id).exec();

        if (comic.owner.id.equals(req.user._id)) {
            next()
        } else {
            res.redirect("back")
        }

    } else {
        res.redirect("/login")

    }
}



export default checkComicOwner;