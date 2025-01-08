import express from "express";
const router = express.Router();
import Comic from "../models/comic.js";
import Comment from "../models/comment.js"


// Get all comics
router.get("/", async (req, res) => {

    try {
        const foundComics = await Comic.find().exec()
        res.render("comics", {comics:foundComics});

    } catch(err){
        console.log(err);
        res.send("you broke it... /index");
    }
})


// Post a new comic
router.post("/", async (req, res) => {
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
        image: req.body.image
    }

    
    try {
        const comic = await Comic.create(newComic)

        console.log(comic)
        res.redirect("/comics/" + comic._id);

    } catch(err) {
        console.log(err);
        res.redirect("/comics");
    }
})


// Get form to create a new comic
router.get("/new", (req, res) => {
    res.render("comics_new");
});


router.get("/:id", async (req, res) => {

    try {
        const comic = await Comic.findById(req.params.id).exec();

        if (!comic) {
            return res.status(404).send("Comic not found.");
        }

        const comments = await Comment.find({comicId: req.params.id}).exec();
        const renderedComments = comments.length ? comments : [];

        res.render("comics_show", {
            comic,
            comments: renderedComments,
        });

    }catch (err){
        console.error("Error fetching comic or comments: ", err);
        res.status(500).send(`Error: ${err.message}`);
    }
})


router.get("/:id/edit", async (req, res) => {

    try{
        const comic = Comic.findById(req.params.id).exec();
        res.render("comics_edit", {comic});
    }catch(err){
        console.log(err);
        res.send("Broken... /comics/id/edit");
    };
    
})


router.put("/:id", (req, res) => {
    const genre = req.body.genre.toLowerCase();
    const updatedComic = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        publisher: req.body.publisher,
        date: req.body.date,
        series: req.body.series,
        issue: req.body.issue,
        genre: req.body.genre,
        color: !!req.body.color,
        image: req.body.image
    }
    Comic.findByIdAndUpdate(req.params.id, updatedComic,{new:true})
    .exec()
    .then( updatedComic => {
        console.log(updatedComic)
        res.redirect(`/comics/${req.params.id}`)
    })
    .catch(err => {
        res.send("Error:", err);
    })
})


router.delete("/:id", (req, res) => {
    Comic.findByIdAndDelete(req.params.id)
    .exec()
    .then(deletedComic => {
        console.log("Deleted:", deletedComic);
        res.redirect("/comics");
    })
    .catch(err => {
        res.send("Error deleting: ", err)
    })
})


export default router;