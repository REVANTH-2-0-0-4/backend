import usermodel from "../db/models/user.model.js"
import * as userservice from "../services/user.service.js"
import { validationResult } from "express-validator";
import { redisclient } from "../services/redis.services.js";
import user from "../db/models/user.model.js";
export const createusercontroller = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const user = await userservice.createuser(req.body);
            const token = user.generateJWT();
            delete user._doc.password;

            res.status(201).json({ user, token });

        }
        catch (err) {
            res.status(400).send(err.message);
        }
    }
}
export const logincontroller = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const response = await userservice.loginuser(req.body);
        // console.log(response);

        if (response.status === "error") {
            res.status(401).send(response.message);
        }
        else {
            const token = response.generateJWT();
            delete response._doc.password;
            res.status(200).json({ response, token });
        }
    }
}
export const profilecontroller = async (req, res) => {
    res.status(200).json({
        user: req.user
    })
}
export const logoutcontroller = async (req, res) => {
    try {
        const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
        redisclient.set(token,'logout','EX',60*60*24);
        res.status(200).json({
            message : "user logged out successfully"
        })
    }
    catch (err) {
        console.log(err);
        
        res.status(400).send(err);
    }
}
export const getallusers = async (req, res) => {
    try {
      const loggedin_user = req.user?.email;
      if (!loggedin_user) {
        return res.status(401).send("User not logged in.");
      }
      const user = await usermodel.findOne({ email: loggedin_user });
      if (!user) {
        return res.status(404).send("Logged-in user not found.");
      }
      const response = await userservice.allusersexceptid(user._id); 
  
      if (response.status === "error") {
        return res.status(400).send(response.message);
      }
  
    //   console.log("The response:", response);
      return res.status(200).send(response.allusers);
  
    } catch (error) {
      return res.status(500).send(error.message); // Changed to 500 for server-side error
    }
  };
  