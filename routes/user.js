const express = require("express");
const router = express.Router();
const wrapeAsync = require("../utils/wrapeAsync.js");
const passport = require("passport");
const { savedUrl } = require("../middleware.js");
const { signUp, renderSignup, renderLogin, logIn, logOut } = require("../controller/user.js");

router
    .route('/signup')
    .get(renderSignup)
    .post(wrapeAsync(signUp));

router
    .route('/login')
    .get(renderLogin)
    .post(savedUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), wrapeAsync(logIn))


router.get('/logout', logOut);


module.exports = router;