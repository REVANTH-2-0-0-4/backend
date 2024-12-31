import connect from "./db/db.js";
connect();


import express from "express";
const app = express();
import morgan from "morgan";
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.send(" haa chal raha hai beta");
})
export default app;