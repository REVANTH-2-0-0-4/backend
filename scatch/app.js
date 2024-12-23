require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const db = require("./config/mongoose-connection");
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require("./routes/index");
const cookieParser = require('cookie-parser');
app.use(cookieParser("keyboard cat"));
app.use(flash());
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY, 
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", indexRouter);
app.set('view engine', 'ejs');
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.listen(3000, () => {
    console.log('Server is running on the port 3000');
});
