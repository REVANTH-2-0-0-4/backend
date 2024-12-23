const mongoose = require("mongoose");
const  config = require("config");
const dgbr = require("debug")("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dgbr("connected");
})
.catch(function(err){
    dgbr(err);
})
module.exports = mongoose.connection;
