const express = require('express')
// by default express is like a function  so we run that function 
// when it runs it gives all those that express can do 
// so we store them in a variable 
const  app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
//routes create karna=> what is a route , anything after the domain name can be called as a  route 
app.use(function(req,res,next){
console.log("middle ware chalgaya");
next(); // forwards the request to forward parts
});
app.get("/", function(req,res){
    res.send("champion meraaa anuj")
})
app.get("/about", function(req,res){
    res.send("the about page of  our website ")
})

app.listen(3000);