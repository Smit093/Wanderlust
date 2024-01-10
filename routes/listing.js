const express = require("express");
const router = express.Router();
const wrapeAsync = require('../utils/wrapeAsync.js');
const { isLoggedIn, isOwner } = require("../middleware.js");
const listinController = require('../controller/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });


router
    .route('/')
    //INDEX Rout
    .get(wrapeAsync(listinController.index))
    //POST NEW LISTING
    .post(isLoggedIn, upload.single('listing[image]'), wrapeAsync(listinController.postNewListing));


//NEW Rout
router.get('/new', isLoggedIn, wrapeAsync(listinController.renderNewFrom));

router.get('/trending', listinController.trending);
router.get('/rooms', listinController.rooms);
router.get('/cities', listinController.city);
router.get('/mountains', listinController.mountain);
router.get('/castels', listinController.castel);
router.get('/pools', listinController.pools);
router.get('/camping', listinController.camping);
router.get('/farms',listinController.farm);
router.get('/arctic', listinController.arctic);
router.get('/dome',listinController.dome);
router.get('/boat', listinController.boat);

router.get('/search', listinController.search);

router
    .route('/:id')
    //Show rout
    .get(wrapeAsync(listinController.showListing))
    //UPDATE
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapeAsync(listinController.updateListing))
    //DELETE
    .delete(isLoggedIn, isOwner, wrapeAsync(listinController.destroyListing));

//EDIT
router.get('/:id/edit', isLoggedIn, isOwner, wrapeAsync(listinController.renderEditForm));

module.exports = router;