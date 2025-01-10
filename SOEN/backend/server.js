import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
import app from "./app.js";
import http from "http";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import projectModel from "./db/models/project.model.js";
import { generate_result } from "./services/ai.services.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(new Error("please authenticate"));
        }
        const projectid = socket.handshake.query.projectid;
        if (!projectid) {
            return next(new Error("project id is not present"));
        }
        if (!mongoose.Types.ObjectId.isValid(projectid)) {
            return next(new Error("invalid project id"));
        }
        const project = await projectModel.findOne({ _id: projectid });
        if (!project) {
            return next(new Error("project not found")); // Adding error handling if project not found
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return next(new Error("please authenticate"));
        }

        socket.project = project;
        socket.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
});

io.on('connection', socket => {
    console.log("client connected");
    const _id = String(socket.project?._id);
    socket.join(_id);

    socket.on("project-message", async (data) => {
        const message = data.message;
        // console.log("received message", data.message, "from:", data.sender.email);
        socket.broadcast.to(_id).emit("project-message", data);
        if (message.includes('@ai')) {
            message.replace('@ai', '');
            const response = await generate_result(message);
            // console.log("response :",response)
            io.to(_id).emit("project-message", {
                message: response,
                sender: {
                    _id: "ai",
                    email: 'AI'
                }
            })
        }

    });

    socket.on('event', data => { /* … */ });
    socket.on('disconnect', () => { /* … */ });
});

server.listen(port, () => {
    console.log(`server is running on the port ${port}`);
});