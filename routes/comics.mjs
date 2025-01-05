import express from "express";
const router = express.Router();
import Comic from "../models/comic.js";
import Comment from "../models/comment.js"

router.get("/", (req, res) => {
    Comic.find()
    .exec()
    .then((foundCoomics) => {
        res.render("comics", {comics:foundCoomics});
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    })
})

router.post("/", (req, res) => {
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

    Comic.create(newComic)
    .then((comic) => {
        console.log(comic)
        res.redirect("/comics/" + comic._id);
    })
    .catch((err) => {
        console.log(err);
        res.redirect("/comics");
    })
})


router.get("/new", (req, res) => {
    res.render("comics_new");
});


router.get("/:id", (req, res) => {
    Comic.findById(req.params.id)
    .exec()
    .then((comic) => {
        Comment.find({comicId: req.params.id})

        .then(comments => {
            // Use a fallback for comments when none are found
            const renderedComments = comments.length === 0 ? [] : comments;

            res.render("comics_show", {
                comic,
                comments: renderedComments,
            });
        })
        .catch(err => {
            res.status(500).send(`Error fetching comments: ${err.message}`);
        });

    })
    .catch((err) => {
        res.status(400).send(`Product not found: ${err}`)
    })
})

router.get("/:id/edit", (req, res) => {
    Comic.findById(req.params.id)
    .exec()
    .then((comic) => {
        res.render("comics_edit", {comic})
    })
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