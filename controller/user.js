const User = require('../Models/user.js');

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let user = await User.register(newUser, password);
        req.login(user, ((err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'Welcome to wanderlust');
            res.redirect('/listings');
        }));
    } catch (err) {
        req.flash("error", err.message);
        res.redirect('/signup')
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.logIn = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust ");
    let redirectUrl = res.locals.redirectUrl || '/listings'
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'logged you out!');
        res.redirect('/listings');
    });
};