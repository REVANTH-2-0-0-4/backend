const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const postModel = require('./models/post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const user = require('./models/user');
const upload = require('./config/multerconfig');
const { runInNewContext } = require('vm');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("home");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post('/create', (req, res) => {
    let { name, username, email, age, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;
        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) throw err;
            const user = await userModel.create({
                name,
                username,
                email,
                age,
                password: hash
            });
        });
    });
    const token = jwt.sign({ email: email }, "secret");
    res.cookie("token", token);
    res.redirect("/profile");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) throw new Error("User not found");
    else bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (!result) throw new Error("Incorrect password");
        const token = jwt.sign({ email: email }, "secret");
        res.cookie("token", token);
        res.redirect('/profile');
    });
});

app.get('/logout', async (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
});

app.get('/profile', isloggedin, async (req, res) => {
    const posts = await postModel.find({ user: req.userdata._id }).populate('user');
    res.render("profile", {
        userdata: req.userdata,
        posts: posts
    });
    res.render("profile", { userdata: req.userdata });


});

app.get('/uploadfile', isloggedin, (req, res) => {
    res.render("uploadfile");
});

app.post('/uploadfile', isloggedin, upload.single('image'), async (req, res) => {
    let data = req.userdata;
    if (!req.file) throw new Error("File upload failed");
    data.profilepic = req.file.filename;
    await data.save();
    res.redirect("/profile");
});

app.post("/create/post", isloggedin, async (req, res) => {
    const userdata = req.userdata;
    if (!req.body.content) throw new Error("Content cannot be empty");
    const post = await postModel.create({
        user: user._id,
        content: req.body.content
    });
    const posts = await postModel.find({ user: user._id }).populate('user');
    console.log(posts);

    res.render('profile', { userdata: req.userdata, posts: posts });
});

async function isloggedin(req, res, next) {
    if (!req.cookies.token || req.cookies.token == "") throw new Error("Not logged in");
    const data = jwt.verify(req.cookies.token, "secret");
    const userdata = await userModel.findOne({ email: data.email });
    if (!userdata) throw new Error("Invalid token");
    req.userdata = userdata;
    next();
}

app.listen(3000, () => {
    console.log("app running with the port number 3000");
});
