import usermodel from "../db/models/user.model.js"
import * as userservice from "../services/user.service.js"
import { validationResult } from "express-validator";
import { redisclient } from "../services/redis.services.js";
export const createusercontroller = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        try {
            const user = await userservice.createuser(req.body);
            const token = user.generateJWT();
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
        console.log(response);

        if (response.status === "error") {
            res.status(401).send(response.message);
        }
        else {
            const token = response.generateJWT();
            res.status(200).json({ response, token })
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
        const token = req.cookies.token || req.headers.authorisation.split(' ')[1];
        redisclient.set(token,'logout','EX',60*60*24);
    }
    catch (err) {
        res.status(400).send(err);
    }
}