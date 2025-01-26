import express from "express";
const router = express.Router();
import Comic from "../models/comic.js";
import Comment from "../models/comment.js"
import isLoggedIn from "../utils/isLoggedIn.mjs";
import checkComicOwner from "../utils/checkComicOwner.mjs";


// GET all comics
router.get("/", async (req, res) => {

    try {
        const foundComics = await Comic.find().exec()
        res.render("comics", { comics: foundComics });

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
        }
    }


    try {
        const comic = await Comic.create(newComic)

        console.log(comic)
        res.redirect("/comics/" + comic._id);

    } catch (err) {
        console.log(err);
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

    if(validGenres.includes(req.params.genre.toLocaleLowerCase())) {
        const comics = await Comic.find({genre: req.params.genre}).exec();
        res.render("comics", {comics});
    } else {
        res.send("Please enter a valid genre!")
    }
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
        res.redirect(`/comics/${req.params.id}`)

    } catch (err) {
        console.log(err);
        res.send("Error:", err);
    }
})


// DELETE a comic
router.delete("/:id", checkComicOwner, async (req, res) => {
    try {
        const comic = await Comic.findByIdAndDelete(req.params.id).exec();
        res.redirect("/comics");
    } catch (err) {
        res.send("Error deleting: ", err)
    }
})






export default router;