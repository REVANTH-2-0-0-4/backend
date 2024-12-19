const express = require("express");
const router = express.Router();
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ownermodel = require("../models/owner-model")
router.use(cookieParser());
if (process.env.NODE_ENV === "development"){
    try {
        router.post('/create', (req, res) => {
            let { fullname, email, password } = req.body;
            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) return res.status(500).send("something went wrong Please try again");
                else{
                    let owner = await ownermodel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    res.send(owner);
                }
            });
        })
    }
    catch (err) {
        res.send(err.message);
    }
}



router.get('/', (req, res) => {
    res.send("hey its working");
})

module.exports = router;
