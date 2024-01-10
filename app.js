if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");

const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/review.js');
const usersRouter = require('./routes/user.js');

const session = require('express-session');
const flash = require("connect-flash");

const passport = require("passport");
const passportL = require("passport-local");
const Users = require("./Models/user.js");

const dbUrl = process.env.ATLASDB_URL;
const mongoUrl = 'mongodb://127.0.0.1:27017/wanderlust';

const MongoStore = require('connect-mongo');


main().then((res) => {
    console.log("Connection Succesfull");
})
    .catch(err => console.log(err));

app.set("view engine", 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, '/public')))
app.engine("ejs", ejsMate);


async function main() {
    await mongoose.connect(dbUrl);
}

app.listen(3000, () => {
    console.log("App is listening");
});

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600
});

store.once("error", () => {
    console.log("Error in Mongo session store", err);
});

const sessionOptions = {
    store,
    secret:  process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportL(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});



app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/', usersRouter)



app.all("*", (req, res, next) => {
    let err = {
        status: 404,
        message: 'Page not found !'
    }
    res.status(err.status).render('Error.ejs', { err });
});

app.use((err, req, res, next) => {
    res.set("Somthing went wrong !");
    let { status = 500, message = "Smothing went wrong" } = err;
    res.status(status).render('Error.ejs', { err });
    res.status(status).send(message);
});