const mongoose = require("mongoose");
const Listing = require("../Models/listing.js");
const initData = require("./data.js");

main().then((res) => {
  console.log("Connection Succesfull");
})
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: '6599665a3eaa4cf556a4f215' }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
}


initDB();