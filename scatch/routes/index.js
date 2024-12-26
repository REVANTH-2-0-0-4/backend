const express = require("express");
const router = express.Router();
let productmodel = require("../models/product-model");
const isloggedin = require("../middlewares/isloggedin");
const usermodel = require("../models/user-model");

router.get('/',function(req,res){
    const loggedin = false;
    res.render("index",{loggedin});
})
router.get("/shop",isloggedin,async (req,res)=>{
    let success  = req.flash("success");
    const products =  await productmodel.find();    
    res.render("shop",{products,success});
})
router.get("/addtocart/:id",isloggedin,async (req,res)=>{
   let user = await usermodel.findOne({email : req.user.email});
   user.cart.push(req.params.id);
   user.save();
   req.flash("success","added to cart");
   res.redirect("/shop");
})
module.exports = router;