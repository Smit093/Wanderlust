const Listing = require("./Models/listing.js");
const reviews = require("./Models/reviews.js");
const { listingSchema, reviewSchema } = require('./schema.js')
const ExpressError = require('./utils/ExpressError.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash('error', 'please log in to create a listing at /signup or /login')
        res.redirect('/login')
    } else {
        next();
    }
}

module.exports.savedUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = (async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (res.locals.currUser && !listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You're not the owner of the listing !");
        return res.redirect(`/listings/${id}`);
    }
    next();
});

module.exports.validateListing = ((req, next) => {
    {
        let { error } = listingSchema.validate(req.body);
        if (error) {
            let errMSG = error.details.map((el) => el.message).join(' ');
            throw new ExpressError(400, errMSG);
        } else {
            next();
        }
    }
});

module.exports.isAuthor = (async (req, res, next) => {
    let { id, reviewID } = req.params;
    let review = await reviews.findById(reviewID);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You did not create this review !");
        return res.redirect(`/listings/${id}`);
    }
    next();
});


module.exports.validateReview = (req, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
};
