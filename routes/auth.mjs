import express from 'express';
const router = express.Router();
import passport from 'passport';
import User from '../models/user.js';



// Sign Up - New
router.get('/signup', (req, res) => {
    res.render("signup");
})


// Sign Up - Create
router.post("/signup", async (req, res) => {
    try {
        req.flash("success", "signed up 1!")
        const newUser = await User.register(new User({
            username: req.body.username,
            email: req.body.email,
        }), req.body.password);
        req.flash("success", "signed up 2!")
        passport.authenticate("local")(req, res, () => {
            res.redirect('/comics');
            req.flash("success", "Signed up 3!")
        });
        
    } catch (err) {
        console.log(err);
        res.send(err);
    }
})


//Login - Show form
router.get('/login', (req, res) => {
    res.render('login');
})


//Login
router.post("/login", passport.authenticate('local', {
    
    successRedirect: '/comics',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: "Logged in successfully!",

}));


//Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        
        req.flash("success", "Logged you out!")
        res.redirect('/');
        

        console.log(req.flash())
    });
});




export default router;

