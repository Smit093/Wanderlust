const express = require("express");
const router = express.Router({mergeParams:true});
const wrapeAsync = require('../utils/wrapeAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js')
const { isLoggedIn, isAuthor } = require("../middleware.js");
const { createReview, destroyReview } = require("../controller/review.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.log(result);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

//POST REVIEWS 
router.post('/',isLoggedIn, validateReview, wrapeAsync(createReview));

//DELETE REVIEW
router.delete("/:reviewID",isLoggedIn,isAuthor, wrapeAsync(destroyReview));

module.exports=router;