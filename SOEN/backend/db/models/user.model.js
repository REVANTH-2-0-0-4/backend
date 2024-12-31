import mongoose from "mongoose";
const userschema = mongoose.Schema({
    email : {
        type : String,
        required : true, 
        unique : true, 
        trim : true ,
        lowercase : true, 
        minLength : [6, " email must be atleast 6 charecters long "],
        maxLength : [50, " email must be atleast 6 charecters long "]
    },
    password  : {
        type : String,
        Select : false 
    }
}) 