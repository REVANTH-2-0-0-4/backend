const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
const { createDecipheriv } = require("crypto");
const createuser = require("../controllers/authcontroller");
const generatetoken = require("../utils/generatetoken");
// const flash = require("flash");


router.get('/create', (req, res) => {
    res.render("index");
})
router.get('/', (req, res) => {
    res.send("everything working fine");
})
router.post('/create', async(req,res)=>{
    let { fullname, email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (user) {
        res.send("user already exists");
    }
    else {
       const createduser = createuser(email,password,fullname);
       console.log(createduser);
       const token = generatetoken(createduser);
       res.cookie("token",token);
       res.redirect('/users')
    }


})
module.exports = router;
