const express = require("express");
const router = express.Router();
let productmodel = require("../models/product-model");
const isloggedin = require("../middlewares/isloggedin");

router.get('/',function(req,res){
    // let error = req.flash("error");
    res.render("index");
})
router.get("/shop",isloggedin,async (req,res)=>{
    let products =  await productmodel.find();    
    res.render("shop",{products});
})
module.exports = router;