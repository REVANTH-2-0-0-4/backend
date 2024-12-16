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
})
app.get('/signup', (req, res) => {
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
            // console.log(user);
        });
    });
    const token = jwt.sign({ email: email }, "secret");
    res.cookie("token", token);
    res.redirect("/profile");
})
app.get("/login", (req, res) => {
    res.render("login");
})
app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    // console.log(req.body);
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(500).render("error");
    else bcrypt.compare(password, user.password, (err, result) => {
        if (!result) res.status(500).render("error");
        else {
            const token = jwt.sign({ email: email }, "secret");
            res.cookie("token", token);
            res.redirect('/profile');
        }
    })
})
app.get('/logout', async (req, res) => {
    res.cookie("token", "");
    res.redirect('/');
})
app.get('/profile', isloggedin, (req, res) => {

    res.render("profile", { userdata: req.userdata });
})
app.get('/uploadfile', isloggedin, (req, res) => {
    res.render("uploadfile");
})
app.post('/uploadfile',isloggedin, upload.single('image'), async (req, res) => {
  let data = req.userdata;
//   console.log("data : ", data);
  console.log(" file data  :  ", req.file.filename);
  data.profilepic = req.file.filename;
  await data.save();
  res.redirect("/profile");
})
app.post("/create/post", isloggedin, async (req, res) => {
    const user = req.userdata;
    const post = await postModel.create({
      user : user._id,
      content : req.body.content
    });
    // const posts = await  postModel.find({user : user._id});
    // console.log(posts);
    
    res.render('profile');

})
async function isloggedin(req, res, next) {
    // console.log(req.cookies.token);
    if (req.cookies.token == "") {
        res.status(500).redirect('/login');
    }
    else {
        const data = jwt.verify(req.cookies.token, "secret");
        // console.log(" data : ", data.email);
        const userdata = await userModel.findOne({ email: data.email });
        req.userdata = userdata;
        next();
    }
}
app.listen(3000, () => {
    console.log("app running with the port number 3000");
})