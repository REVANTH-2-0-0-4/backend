const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname ,'public')));
const [userModel,clearDatabase] = require('./models/user');
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render("index");
})
app.post("/create", async (req,res)=>{
    let { username, email, image_url } = req.body;
    let user = await userModel.create({
        Username : username,
        email :email,
        image_Url :image_url[0]
        
    })
    // console.log(req.body.image_url[0]);
    res.redirect('/read');
    // res.send(user);
})
app.get('/read',async (req,res)=>{
    const users = await userModel.find();
    res.render("read",{users : users});
})
app.get('/edit/:id',async (req,res)=>{
    let user = await userModel.findOne({_id  : req.params.id});
    res.render("edit",{user : user});
})
app.post('/editt/:id',async (req,res)=>{
    let user = await userModel.findOneAndUpdate({_id  : req.params.id},{
        Username : req.body.Username,
        email : req.body.email,
        image_Url : req.body.image_Url
    },{new :true});
    res.redirect("/read");
})
app.get('/delete/:id',async (req,res)=>{
   const user = await userModel.findOneAndDelete({_id :req.params.id});
   res.redirect('/read');
})
app.get("/clearDatabase", async (req,res)=>{
   await clearDatabase();
//    alert("your database is cleared , you can start over now "); -- isnt suitable here , because this is server side , and the alert function is designed for client side functioning 
   res.redirect('/');
})

app.listen(3000,()=>{
    console.log("server is running with the port number 3000"); 
});


