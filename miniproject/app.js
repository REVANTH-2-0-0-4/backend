const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.render("home");
})
app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.post('/create', (req, res) => {
    let { name, username, email, age, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const user = await userModel.create({
                name,
                username,
                email,
                age,
                password: hash
                

            })
            console.log(user);
        });
    });
    const token = jwt.sign({ email: email }, "secret");
    res.cookie("token", token);
    res.redirect("/profile");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log(req.body);
    const user = await userModel.findOne({email : email});
    if(!user) return res.status(500).send("some thing has gone wrong , please try again later");
     else bcrypt.compare(password,user.password,(err,result)=>{
    if(!result) res.status(500).send("some thing went wrong , please try again later");
    else{
        const token = jwt.sign({email : email},"secret");
        res.cookie("token", token);
        res.redirect('/profile');
    }
    })
})
app.get('/logout', async (req, res) => {
  res.cookie("token","");
  res.redirect('/');
})
app.get('/profile',isloggedin, (req, res) => {
    res.render("profile");
})
function isloggedin(req,res,next){
    console.log(req.cookie);
    // if(req.cookie.token == ""){
    //     res.status(500).redirect('/login');
    // }
    // else{
    //     const data = jwt.verify(req.cookie.token,"secret");
    //     req.user = data;
    //     next();

    // }
}
app.listen(3000, () => {
    console.log("app running with the port number 3000");
})