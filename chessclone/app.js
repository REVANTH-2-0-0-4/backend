const path = require("path");
const express = require("express");
const app = express();
const socket = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socket(server);
const { Chess } = require("chess.js");
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
    if (!players.white) {
        players.white = socket.id;
        socket.emit("playerrole", "w");
    }
    else if (!players.black) {
        players.black = socket.id;
        socket.emit("playerrole", "b");
    }
    else {
        socket.emit("spectatorrole");
    }
    socket.on("move", (move) => {
        try {
            if (chess.turn() === 'W' && socket.id !== white) return;
            if (chess.turn() === 'B' && socket.id !== black) return;
            else {
                const result = chess.move(move);
                if (result) {
                    currentplayer = chess.turn(); 
                    io.emit("move", move);
                    io.emit("boardstate", chess.fen());
                }
                if (chess.isCheckmate()){
                    console.log("sompaapidi");
                    
                    io.emit("gameover", {
                        result: "checkmate",
                        winner: chess.turn() === 'w' ? "Black" : "White"
                    });
                } else if (chess.in_draw()) {
                    io.emit("gameover", { result: "draw", reason: "stalemate or insufficient material" });
                } else if (chess.in_stalemate()) {
                    io.emit("gameover", { result: "draw", reason: "stalemate" });
                } else if (chess.in_threefold_repetition()) {
                    io.emit("gameover", { result: "draw", reason: "threefold repetition" });
                }
                else {
                    socket.emit("invalidmove", move);
                }
            }
        }
        catch (err) {
            socket.emit("invalidmove", move);
        }
    })
    socket.on("disconnect", () => {
        console.log("disconnected");
        if (socket.id === players.white) {
            delete players.white;
        }
        else if (socket.id === players.black) {
            delete players.black;
        }
    })
})
server.listen(3000, () => {
    console.log("the server is running with a port number of 3000");
});