const mongoose = require("mongoose");
const passportLM = require('passport-local-mongoose')

const userSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLM);

module.exports=mongoose.model("User",userSchema);