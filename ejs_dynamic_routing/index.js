const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render("index");
})
app.get('/profile/:username/:age',(req,res)=>{
    res.send(`hi ${req.params.username} , we welcome you and your age is ${req.params.age}`);
})


app.listen(3000,()=>{console.log("server is running with the port number 3000.....")});
// console.log(__dirname);