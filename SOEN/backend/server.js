import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import app from "./app.js";
import http from "http";
import jwt from "jsonwebtoken";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
import projectModel from "./db/models/project.model.js";
import mongoose from "mongoose";
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});
io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) {
            next(new Error("please authenticate"));
        }
        const projectid = socket.handshake.query.projectid;
        if (!projectid) {
            next(new Error("project id is not present"));
        }

        if (!mongoose.Types.ObjectId.isValid(projectid)) {
            next(new Error("invalid project id"));
        }
        const project = await projectModel.findOne({ _id: projectid });
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            next(new Error("please authenticate"));
        }
        socket.project = project;
        socket.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
})
io.on('connection', socket => {
    console.log("client  connected ");
    const _id = String(socket?.project?._id);    
    socket.join(_id);
    socket.on("project-message", (data) => {
        console.log("recieved message ", data.message , " from  : ",data.sender.email);
        socket.broadcast.to(socket.project._id).emit("project-message", data);
    })
    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});
server.listen(port, () => {
    console.log(`server is running on the port ${port}`);
})      
