require("dotenv").config();
const path = require("path");
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const app = express();
const server = http.createServer(app);
const io = socket(server);
const chess = new Chess();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
let players = {};
let currentplayer = "W"
app.get("/", (req, res) => {
    res.render("index", { title: "Custom Chess Game" });
})
io.on("connection", (socket) => {
    console.log("connected");
    
socket.on("disconnect", () => {
    console.log("disconnected");
})

})
server.listen(3000, () => {
    console.log("the server is running with a port number of 3000");
});