const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
const flash = require("flash");

router.get('/create', async (req, res) => {
    res.render("index");
    let {fullname , email , password} = req.body;
    let user = await usermodel.find({email : email });
    if(user) {
         res.flash("user already exists");
         res.redirect("/create")
    }
    bcrypt.hash(password,10,async (err,hash)=>{
    const createduser = await usermodel.create({
        fullname,
        email,
        password : hash
    })
    })

    })
module.exports = router;
