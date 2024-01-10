const mongoose = require("mongoose");
const Review = require('./reviews.js')
//creating schema
let listScehma = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'review',
        },
    ],
    owner:
    {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    catagory:{
        type:String,
        enum:["trending",'rooms','iconic city','mountain','castel','pools','camping','farm','arctic','dome','boat'],
    },
});

listScehma.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
//creating model
let Listing = mongoose.model("Listing", listScehma);


module.exports = Listing;