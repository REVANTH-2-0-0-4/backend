import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userschema = new mongoose.Schema({
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
        Select : false,
    }   
}) 
userschema.statics.hashpassword = async(password)=>{
    return await bcrypt.hash(password,10);
}
userschema.methods.isvalidpassword = async function(password){
    return bcrypt.compare(password,this.password);
}
userschema.methods.generateJWT = function(){
    return jwt.sign({email : this.email},process.env.JWT_SECRET);
}

const user = mongoose.model("user",userschema);
export default user;