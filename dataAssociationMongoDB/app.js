const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userModel = require('./models/user');
const postmodel = require('./models/post');
app.get('/', (req, res) => {
    res.send("haan..! chal tho raha hai na");
})
app.get('/create',async (req, res)=>{
    const user = await userModel.create({
        name : "revanth kurapati",
        email : " revanthkurapati56@gmail.com",
        age  : 21
    })
    console.log(user);
    res.redirect('/');
})
app.get('/post/create',async (req,res)=>{
    const post = await postmodel.create({
        postdata : " hi , how're everyone doing ", 
        user : "675d64cf90300c42be3b4abd",
    })
    const user = await userModel.findOne({_id : "675d64cf90300c42be3b4abd"});
    user.posts.push(post._id);
    res.send({post,user});
    // res.redirect('/');
})

app.listen(3000, () => {
    console.log("server is running with the port number 3000");

})