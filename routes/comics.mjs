import express, { response } from "express";
const router = express.Router();
import Comic from "../models/comic.js";
import Comment from "../models/comment.js"
import isLoggedIn from "../utils/isLoggedIn.mjs";
import checkComicOwner from "../utils/checkComicOwner.mjs";


// GET all comics
router.get("/", async (req, res) => {

    try {
        const successMessage = req.flash("success");
        const foundComics = await Comic.find().exec()
        res.render("comics", { comics: foundComics, successMessage });

    } catch (err) {
        console.log(err);
        res.send("you broke it... /index");
    }
})


// POST a new comic
router.post("/", isLoggedIn, async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const newComic = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre: req.body.genre,
        color: !!req.body.color,
        image: req.body.image,
        owner: {
            id: req.user._id,
            username: req.user.username
        },
        upvotest: [req.user.username],
        downvotes: []
    }


    try {
        const comic = await Comic.create(newComic)

        req.flash("success", "Comic created")
        res.redirect("/comics/" + comic._id);

    } catch (err) {
        req.flash("error", "Error creating comic")
        res.redirect("/comics");
    }
})


// Get form to create a new comic
router.get("/new", isLoggedIn, (req, res) => {
    res.render("comics_new");
});


// Search route
router.get("/search", async (req, res) => {

    try {

        const comics = await Comic.find({
            $text: {
                $search: req.query.term
            }

        })

        res.render("comics", { comics })

    } catch (err) {

        console.log(err);
        res.send("Broken search")
    }
})


//Genre route
router.get("/genre/:genre", async (req, res) => {
    const validGenres = ["superhero", "manga", "humor", "slice-of-life", "sci-fi", "fantasy", "horror", "action", "non-fiction"]

    if (validGenres.includes(req.params.genre.toLocaleLowerCase())) {
        const comics = await Comic.find({ genre: req.params.genre }).exec();
        res.render("comics", { comics });
    } else {
        res.send("Please enter a valid genre!")
    }
})


// Vote
router.post("/vote", isLoggedIn, async (req, res) => {
    console.log("Request body: ", req.body);

    const comic = await Comic.findById(req.body.comicId);
    const alreadyUpvoted = comic.upvotes.indexOf(req.user.username);
    const alreadyDownvoted = comic.downvotes.indexOf(req.user.username);

    let response = {};
    //voting logic
    if (alreadyUpvoted === -1 && alreadyDownvoted === -1) {

        if (req.body.voteType === "up") {

            comic.upvotes.push(req.user.username);
            comic.save();
            response.message = { message: "Upvoted tallied!, code: 1" };

        } else if (req.body.voteType === "down") {

            comic.downvotes.push(req.user.username);
            comic.save();
            response.message = { message: "Downvoted tallied!", code: -1 }

        } else {
            response.message = { message: "Error 1!", code: "err" }
        }

    } else if (alreadyUpvoted >= 0) {

        if (req.body.voteType === "up") {

            comic.upvotes.splice(alreadyUpvoted, 1);
            comic.save();
            response.message = { message: "Upvote removed!", code: 0 };

        } else if (req.body.voteType === "down") {

            comic.upvotes.splice(alreadyUpvoted, 1);
            comic.downvotes.push(req.user.username);
            comic.save();
            response.message = { message: "Changed to downvote", code: -1 };

        } else {

            response.message = { message: "Error 2", code: "err" };

        }

    } else if (alreadyDownvoted >= 0) {

        if (req.body.voteType === "up") {

            comic.downvotes.splice(alreadyDownvoted, 1);
            comic.upvotes.push(req.user.username);
            comic.save();
            response.message = { message: "Changed to upvote", code: 1 };

        } else if (req.body.voteType === "down") {

            comic.downvotes.splice(alreadyDownvoted, 1);
            comic.save();
            response.message = { message: "Removed downvote", code: 0 };

        } else {
            response.message = { message: "Error 3", code: "err" };
        }

    } else {

        response.message = { message: "Error 4", code: "err" };

    }
    //Update score immediately prior to sending
    response.score = comic.upvotes.length - comic.downvotes.length;

    res.json(response);
})


// GET specific comic by ID
router.get("/:id", async (req, res) => {

    try {
        const comic = await Comic.findById(req.params.id).exec();

        if (!comic) {
            return res.status(404).send("Comic not found.");
        }

        const comments = await Comment.find({ comicId: req.params.id }).exec();
        const renderedComments = comments.length ? comments : [];

        res.render("comics_show", {
            comic,
            comments: renderedComments,
        });

    } catch (err) {
        console.error("Error fetching comic or comments: ", err);
        res.status(500).send(`Error: ${err.message}`);
    }
})


// GET form to edit a comic
router.get("/:id/edit", checkComicOwner, async (req, res) => {

    try {
        const comic = await Comic.findById(req.params.id).exec();
        res.render("comics_edit", { comic });
    } catch (err) {
        console.log(err);
        res.send("Broken... /comics/id/edit");
    };

})


// PUT to update a comic
router.put("/:id", checkComicOwner, async (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const updatedComic = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre,
        color: !!req.body.color,
        image: req.body.image
    }

    try {
        const comic = await Comic.findByIdAndUpdate(req.params.id, updatedComic, { new: true }).exec();
        req.flash("success", "Comic successfully updated!")
        res.redirect(`/comics/${req.params.id}`)

    } catch (err) {
        console.log(err);
        req.flash("error", "Error updating comic")
        res.redirect("/comics");
    }
})


// DELETE a comic
router.delete("/:id", checkComicOwner, async (req, res) => {
    try {
        const comic = await Comic.findByIdAndDelete(req.params.id).exec();
        req.flash("success", "Comic successfully deleted!")
        res.redirect("/comics");
    } catch (err) {
        req.flash("error", "Error deleting comic");
        res.redirect("back");
    }
})






export default router;