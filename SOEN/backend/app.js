import connect from "./db/db.js";
connect();
import express from "express";
import userrouter from "./routes/user.routes.js"
import projectroutes from "./routes/project.routes.js"
import airoutes from "./routes/ai.routes.js"
import cors from "cors";
const app = express();
app.use(cors());
import morgan from "morgan";
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send(" haa chal raha hai beta");
})
app.use("/projects", projectroutes);
app.use("/users", userrouter);
app.use("/ai", airoutes);
export default app;