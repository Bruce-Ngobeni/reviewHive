import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import passport from 'passport';




// Sign Up - New
router.get('/signup', (req, res) => {
    res.render("signup");
})


// Sign Up - Create
router.post("/signup", async (req, res) => {

    try {

        const newUser = await User.register(new User({
            username: req.body.username,
            email: req.body.email
        }), req.body.password);

        console.log(newUser);

        passport.authenticate('local')(req, res, () => {
            res.redirect('/comics')
        });

    } catch (err) {
        res.send(err)

    }

})


//Login - Show form
router.get('/login', (req, res) => {
    res.render('login');
})


//Login
router.post("/login", passport.authenticate('local', {
    successRedirect: '/comics',
    failureRedirect: '/login'
}));


//Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/comics');
    });
});




export default router;




