const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.COULD_NAME,
    api_key: process.env.CLOUD_AIP_KEY,
    api_secret: process.env.COULD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',
        allowerdFormates: ['png', 'jpg', 'jpeg'],
    },
});

module.exports={
    cloudinary,
    storage,
}