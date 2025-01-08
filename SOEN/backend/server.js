import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import app from "./app.js";
import http from "http";
import jwt from "jsonwebtoken";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server,{
    cors : {
        origin : '*'
    }
});
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) {
            next(new Error("please authenticate"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            next(new Error("please authenticate"));
        }
        socket.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
})
io.on('connection', socket => {
    console.log("client  connected ");
    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});
server.listen(port, () => {
    console.log(`server is running on the port ${port}`);
})      
