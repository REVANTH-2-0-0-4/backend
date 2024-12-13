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
app.post('/create',  (req, res) => {
    let { name, email, age, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt,  async function (err, hash) {
            const createduser = await usermodel.create({
                name,
                email,
                age,
                password: hash
            })
            console.log(createduser);
            
        });
    });


    res.redirect('/home2');

})
app.listen(3000, () => {
    console.log("the server is running with the port number 3000");
})
