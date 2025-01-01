
import {Router} from "express";
import * as usercontroller from "../controllers/user.controller.js"
const router = Router();
import {body} from "express-validator";
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
export default router; 