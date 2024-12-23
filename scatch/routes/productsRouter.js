const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productmodel = require("../models/product-model");
const flash = require('connect-flash');
router.get('/',(req,res)=>{
res.send("hey its working");
})
router.post("/create",upload.single('image'), async function(req,res){
        try {let{name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
        let product = await productmodel.create({
                image : req.file.buffer,
                name,
                price,
                discount,
                bgcolor,
                panelcolor,
                textcolor
        })
        req.flash("success","the product is created successfully");
        res.redirect("/owners/admin");
}
        catch(err){
              res.send(err.message);
                
        }
})
module.exports = router;
