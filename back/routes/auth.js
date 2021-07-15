const router = require('express').Router();
const passport = require("passport");

login = (req, res, next) => {
    res.send(req.user);
}

router.get("/facebook/", passport.authenticate('facebook', { scope: ['email'] }), login)

router.get("/facebook/callback", passport.authenticate('facebook', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect:'/login'
    }))

router.get('/auth/google',
passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});
    

module.exports = router