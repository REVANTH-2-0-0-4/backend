
import {Router} from "express";
import * as usercontroller from "../controllers/user.controller.js"
const router = Router();
import * as authmiddleware from "../middlewares/auth.middleware.js"
import {body} from "express-validator";
import user from "../db/models/user.model.js";
router.post("/register",
body('email').isEmail().withMessage('email must be a  valid email address'),
body('password').isLength({min : 3}).withMessage("password must be atleast three digits long")
,usercontroller.createusercontroller);
router.get("/",(req,res)=>{
    res.send("in the users  base route");
})
router.post("/login",
    body('email').isEmail().withMessage("email must be a valid email address"),
    body('password').isLength({min : 3}).withMessage("password must be atleast three digits long"),
    usercontroller.logincontroller
)
router.get("/profile",authmiddleware.auth,usercontroller.profilecontroller);
router.get("/logout",authmiddleware.auth, usercontroller.logoutcontroller);
router.get("/allusers",authmiddleware.auth,usercontroller.getallusers);

export default router; 
