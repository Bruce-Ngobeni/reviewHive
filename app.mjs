import express from "express";
// const express = require("express")
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");


const comics = [
    {
        title:"Watchmen",
        description: "I'm baby heirloom cold-pressed venmo prism. Mumblecore iceland cloud bread, semiotics swag disrupt waistcoat solarpunk. Forage fam big mood flannel, pickled bodega boys poutine selfies tote bag. Tacos health goth selfies leggings aesthetic venmo. Meditation hexagon cronut DIY quinoa aesthetic synth keytar street art before they sold out sus waistcoat. JOMO schlitz godard farm-to-table gluten-free distillery vibecession blog enamel pin tumeric master cleanse selvage put a bird on it.",
        image: "https://m.media-amazon.com/images/M/MV5BY2IzNGNiODgtOWYzOS00OTI0LTgxZTUtOTA5OTQ5YmI3NGUzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"
    },
    {
        title:"Batman",
        description: "Snackwave sustainable meh banjo poutine +1 williamsburg tote bag locavore pop-up. Raw denim kickstarter XOXO actually, seitan celiac hoodie Brooklyn +1. Snackwave cliche heirloom humblebrag, gluten-free shabby chic XOXO meggings mixtape seitan banh mi. Lo-fi lyft meditation fashion axe, meh twee same. Sartorial etsy deep v, palo santo 8-bit gluten-free pickled offal selvage same bodega boys whatever vice shoreditch YOLO. Vibecession poke bespoke squid vinyl try-hard pok pok drinking vinegar fanny pack lumbersexual mukbang. Prism succulents meditation pour-over tacos mlkshk PBR&B.",
        image: "https://pbs.twimg.com/profile_images/1816958428771749888/f49y3HRM_400x400.png"
    },
    {
        title:"Dragon Ball",
        description: "Sartorial cold-pressed williamsburg, listicle flannel 90's hashtag lomo marfa everyday carry single-origin coffee 8-bit occupy JOMO fanny pack. Chillwave tonx paleo tilde cardigan beard. Chartreuse knausgaard live-edge gatekeep occupy retro. Pop-up chicharrones hella, copper mug before they sold out gatekeep live-edge trust fund artisan. Letterpress beard neutral milk hotel truffaut crucifix. Tacos mumblecore banh mi four loko man bun lo-fi jean shorts synth scenester hoodie JOMO dreamcatcher fixie mixtape DIY. Meditation cred bodega boys man braid aesthetic gorpcore fingerstache beard mumblecore praxis hammock jianbing celiac.",
        image: "https://deadline.com/wp-content/uploads/2024/07/Dragon-Ball-Series_c42772.jpg?w=681&h=383&crop=1"
    }
]

app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/comics", (req, res) => {
    res.render("comics", {comics});
})


app.listen(PORT, () => {
    console.log("Server is up and running on port: ", PORT);
})

