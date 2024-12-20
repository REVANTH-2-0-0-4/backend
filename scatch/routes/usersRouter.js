const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
const { createDecipheriv } = require("crypto");
const { createuser } = require("../controllers/authcontroller");
const generatetoken = require("../utils/generatetoken");
// const flash = require("flash");
const {login} = require("../controllers/logincontroller");


router.get('/create', (req, res) => {
    res.render("index");
})
router.get('/', (req, res) => {
    res.send("everything working fine");
})
router.post('/register', createuser)
router.post('/login',login)
router.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/users/create");
})
module.exports = router;
