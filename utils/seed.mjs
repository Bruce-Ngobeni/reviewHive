import Comic from "../models/comic.js";
import Comment from "../models/comment.js";


const comic_seeds = [
    {
        title: "Watchmen",
        description: "Watchmen is a 2019 American superhero drama limited series written as a sequel to the 1986 DC Comics series of the same title created by Alan Moore and Dave Gibbons.",
        author: "Alan Moore",
        publisher: "DC",
        date: "1986-09-01",
        series: "Watchmen",
        issue: 1,
        genre: "Superhero",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Watchmen-cover.svg"
    },
    {
        title: "Batman: The Dark Knight Returns",
        description: "Batman[b] is a superhero who appears in American comic books published by DC Comics. Batman was created by the artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939",
        author: "Frank Miller",
        publisher: "DC",
        date: "1986-02-01",
        series: "The Dark Knight",
        issue: 1,
        genre: "Superhero",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/en/7/77/Dark_knight_returns.jpg"
    },
    {
        title: "Y: The Last Man",
        description: "Y: The Last Man is a post-apocalyptic science fiction comic book series by Brian K. Vaughan and Pia Guerra published by Vertigo from 2002 through 2008. The series centers on Yorick Brown and his pet Capuchin monkey Ampersand, the only males who survived the apparent global die-off.",
        author: "Brian K. Vaughn",
        publisher: "Vertigo",
        date: "2002-09-01",
        series: "Y: The Last Man",
        issue: 1,
        genre: "sci-fi",
        color: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Y_the_Last_Man_1.jpg"
    }
]


const seed = async () => {
    // Delete all the current comics and comments
    await Comic.deleteMany();
    console.log("Deleted All The Comics!")

    await Comment.deleteMany();
    console.log("Deleted All The Comments!")

    // // Create three new comics
    // for (const comic_seed of comic_seeds) {
    //     let comic = await Comic.create(comic_seed);
    //     console.log("Created comic: ", comic.title)

    //     // Create a new comment for each comic
    //     await Comment.create({
    //         text: "I ruved this Romic Rook!",
    //         user: "dngobeni023",
    //         comicId: comic._id
    //     })
    //     console.log("Created a new comment!")
    // }

}

export default seed;