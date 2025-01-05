import {Router} from "express";
const router = Router();
import * as projectcontroller from "../controllers/project.controllers.js";
import * as authmiddleware from "../middlewares/auth.middleware.js"
import {body} from "express-validator";

router.post('/create',authmiddleware.auth,
    body('name').isString().withMessage("name must be a string"),
    projectcontroller.createproject)
export default router;