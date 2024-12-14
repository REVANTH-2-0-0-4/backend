const express = require('express');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const usermodel = require('./models/user');
const { create } = require('domain');
const cookieParser = require('cookie-parser');
const { runInNewContext } = require('vm');
const bcrypt = require('bcrypt');
const { log } = require('console');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {


    res.render("home2");
})
app.get('/login', (req, res) => {
    res.render("login");
})
app.get('/signup', (req, res) => {
    res.render("signup");
})
app.get('/home2', (req, res) => {
    res.render("home");
})
app.post('/create', (req, res) => {
    let { name, email, age, password } = req.body;
    const token = jwt.sign({ email: email }, 'secret');
    res.cookie('token', token);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {

            const createduser = await usermodel.create({
                name,
                email,
                age,
                password: hash,
            });
            console.log(createduser);
            return res.redirect('/home2');


        });
    });
});
app.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
})
app.post('/login', async (req, res) => {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
        res.send("something went wrong");
    }
    else {
        bcrypt.compare(req.body.password, user.password, function (err, result) {
        if(result){
            const token = jwt.sign({email : req.body.email},"secret");
            res.cookie("token", token);
            res.send("great, your password and the email matches with the database , and you are good to go ");
        }
        else{
            res.send("sorry , something went wrong , Try logging in again ");
        }
        });
    }
})
app.listen(3000, () => {
    console.log("the server is running with the port number 3000");
})
