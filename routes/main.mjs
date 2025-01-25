import express from "express";
const router = express.Router();
import isLoggedIn from "../utils/isLoggedIn.mjs";


router.get("/", (req, res) => {
    res.render("landing");
})


router.get("/account", isLoggedIn, (req, res) => {
    res.render("account");
})







export default router;