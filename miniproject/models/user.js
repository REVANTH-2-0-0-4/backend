const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/miniproject');
const userSchema = mongoose.Schema({
    name : String,
    username : String, 
    age : Number,
    email : String,
    posts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ],
    password : String,
    profilepic: {
        type: String,
        default: "/images/uploads/default.jpg"
    }
})
module.exports = mongoose.model('user',userSchema);