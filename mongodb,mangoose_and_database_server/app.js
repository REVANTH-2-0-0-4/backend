const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./usermodel');
app.get(express.urlencoded({ extended: true }));
app.get(express.json());
app.get('/', (req, res) => {
    res.send("haa chal tho raha hai na ");
})
app.get('/create', async (req, res) => {
    let user1 = await userModel.create({
        name: "radesh",
        username: "radesh07",
        email: "annamradesh@gmail.com"
    })
    res.send(user1);
})
app.get('/update', async (req, res) => {
    let user1 = await userModel.findOneAndUpdate({username:"REVANTH_2_0_0_4"},{
        name: "KURAPATI VENKATA REVANTH",
        username: "REVANTH_2_0_0_4",
        email: "revanthkurapati56@gmail.com"
    },{new : true});
    res.send(user1);
})
app.get('/read', async (req, res) => {
    // let user1 = await userModel.findOne({name : "revanth"}); // single objects  will give the first object if multiple files are there with the same passed parameter
    let user1 = await userModel.find();// returns  an array of all users 
    res.send(user1);
})
app.get('/delete', async (req, res) => {
     let users= await userModel.findOneAndDelete({name : "revanth"}); 
    res.send(users);
})
app.listen(3000, () => {
    console.log("server is running with the port number 3000");
});