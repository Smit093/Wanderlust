const Listing = require("../Models/listing.js");
const Review = require("../Models/reviews.js");

module.exports.createReview=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    console.log(req.user._id);
    await newReview.save();
    await listing.save();
    req.flash('success','review added successfully');
    res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview=async (req, res) => {
    let { id, reviewID } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await Review.findByIdAndDelete(reviewID);
    req.flash('success','review deleted successfully');
    res.redirect(`/listings/${id}`);
};