const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
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
        });
    });
    const token = jwt.sign({ email: email }, "secret");
    res.cookie("token", token);
    res.redirect("/profile");
})
app.get('/profile', (req, res) => {
    res.render("profile");
})
app.listen(3000, () => {
    console.log("app running with the port number 3000");
})