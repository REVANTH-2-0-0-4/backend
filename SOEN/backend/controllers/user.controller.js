import usermodel from "../db/models/user.model.js"
import userservice from "../services/user.service.js"
import validationresult from "express-validator";
export const createusercontroller = async(req,res)=>{

    const errors = validationresult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    else{
        const user =  await userservice.createuser(req.body);          
    }
}