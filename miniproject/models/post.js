const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    content : String,
    like : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }],
    date :{
        type : Date,
        default : Date.now
    },
    profilepic :{
        type : String,
        default : "/images/uploads/default.jpg"
    } 
})
module.exports = mongoose.model('post',postSchema);