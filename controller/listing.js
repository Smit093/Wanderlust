const Listing = require("../Models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = (async (req, res) => {
    const listings = await Listing.find({})
    res.render("listings/index.ejs", { listings });
});

module.exports.renderNewFrom = ((req, res) => {
    res.render("listings/new.ejs");
});

module.exports.postNewListing = async (req, res) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    let newListening = new Listing(req.body.listing);
    console.log(newListening);
    newListening.owner = req.user._id;
    newListening.image = { url, filename };
    newListening.geometry = response.body.features[0].geometry;
    let savedListing = await newListening.save();
    req.flash('success', 'listing created successfully');
    res.redirect("/listings")
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    // console.log(listing.geometry.coordinates);
    if (!listing) {
        req.flash('error', 'listing you requested does not exists');
        res.redirect('/listings')
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'listing you requested does not exists');
        res.redirect('/listings')
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace('/upload', '/upload/h_300,w_250');
    res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash('success', 'listing updated successfully')
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'listing deleted successfully');
    res.redirect('/listings');
};

module.exports.trending = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'trending';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.rooms = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'rooms';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.city = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'iconic city';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.mountain = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'mountain';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.castel = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'castel';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.pools = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'pools';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.camping = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'camping';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.farm = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'farm';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.arctic = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'arctic';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.dome = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'dome';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.boat = (async (req, res) => {
    const listings = await Listing.find({})
    let listingCatagory = 'boat';
    res.render('listings/filter.ejs', { listingCatagory, listings });
});

module.exports.search=async (req,res)=>{
    const listings = await Listing.find({})
    let search = req.query.destination;
    res.render('listings/search.ejs',{search,listings});
};