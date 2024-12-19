const express = require("express");
const router = express.Router();
require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const ownermodel = require("../models/owner-model")
router.use(cookieParser());
if (process.env.NODE_ENV === "development") {
    try {
        router.post('/create', async (req, res) => {
            let { fullname, email, password } = req.body;

            let owner = await ownermodel.findOne({ email: email });
            if (owner) {
                return res.status(503).send("Owner already exists");
            } else {
                const hash = await bcrypt.hash(password, 10);

                let newOwner = await ownermodel.create({
                    fullname,
                    email,
                    password: hash
                });

                const token = jwt.sign({ email: email, _id: newOwner._id }, "secret");

                res.status(201).send({ owner: newOwner, token });
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}
router.get('/', (req, res) => {
    res.send("hey its working");
})

module.exports = router;
