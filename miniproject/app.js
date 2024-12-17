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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    let loggedin = false;
    if (req.cookies.token !== "") {
        loggedin = true;
    }
    res.render("home", { loggedin });
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
    res.redirect("/");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(500).render("error");
    else bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (!result) return res.status(500).render("error");
        const token = jwt.sign({ email: email }, "secret");
        res.cookie("token", token);
        res.redirect('/');
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
});

app.get('/uploadfile', isloggedin, (req, res) => {
    res.render("uploadfile");
});

app.post('/uploadfile', isloggedin, upload.single('image'), async (req, res) => {
    let data = req.userdata;
    if (!req.file) res.status(500).render("login");
    data.profilepic = req.file.filename;
    await data.save();
    res.redirect("/profile");
});

app.post("/create/post", isloggedin, async (req, res) => {
    const userdata = req.userdata;
    if (!req.body.content) return res.status(500).render("error");
    const post = await postModel.create({
        user: userdata._id,
        content: req.body.content
    });
    res.redirect('/profile');
});
app.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    let post = await postModel.findOneAndDelete({ _id: id });
    res.redirect("/profile");
})
app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let post = await postModel.findOne({ _id: id });
    console.log(post);
    res.render("edit", { post: post });
})
app.get("/like/:id", isloggedin, async (req, res) => {
    let user = req.userdata;
    let id = req.params.id;
    let post = await postModel.findOne({ _id: id });
    let temp = post.like.indexOf(user._id);
    if (temp == -1) {
        post.like.push(user._id);
        await post.save();
        console.log(post);
    }
    else {
        post.like.splice(temp, 1);
        post.save();
    }
    res.redirect("/profile");
})
app.post("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let post = await postModel.findOneAndUpdate({
        _id: id
    }, {
        content: req.body.content
    }, { new: true });
    res.redirect("/profile");
})

async function isloggedin(req, res, next) {
    try {
        
        if (!req.cookies.token) {
            return res.status(401).render("error", { 
                message: "Authentication required. Please log in." 
            });
        }
        const data = jwt.verify(req.cookies.token, "secret");
        const userdata = await userModel.findOne({ email: data.email });
        if (!userdata) {
            return res.status(403).render("error", { 
                message: "Invalid authentication. Please log in again." 
            });
        }
        req.userdata = userdata;
        next();
    } catch (error) {
             return res.status(500).render("error", { 
            message: "An unexpected error occurred. Please try again." 
        });
    }
}

app.listen(3000, () => {
    console.log("app running with the port number 3000");
});
