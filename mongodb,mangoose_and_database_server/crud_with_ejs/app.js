const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname ,'public')));
const {userModel,clearDatabase} = require('./models/user');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render("index");
})
app.post("/create", async (req,res)=>{
    let { username, email, image_url } = req.body;
    let user = await userModel.create({
        username : username,
        email :email,
        image_url :image_url
        
    })
    console.log(req.body);
    res.redirect('/read');
})
app.get('/read',async (req,res)=>{
    const users = await userModel.find();
    res.render("read",{users : users});
})
app.get("/clearalldatabase", async (req,res)=>{
   await clearDatabase();
   res.redirect('/');
})
app.listen(3000,()=>{
    console.log("server is running with the port number 3000"); 
});

