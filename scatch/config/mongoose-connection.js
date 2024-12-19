const mongoose = require("mongoose");
const  config = require("config");
require('dotenv').config(); 
const dgbr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
})
module.exports = mongoose.connection;
