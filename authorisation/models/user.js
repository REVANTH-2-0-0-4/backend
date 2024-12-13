const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/authorisation_test_app');
const userschema = mongoose.Schema({
    name : String,
    email : String,
    age : Number,
    password : String

})
const user = mongoose.model('user',userschema);
module.exports = user;