const jwt = require("jsonwebtoken");
const usermodel = require("../models/user-model");



module.exports = async function (req, res, next) {

    if (!req.cookies.token ) {
        req.flash("error","you need to login first");
        res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await usermodel.findOne({ email: decoded.email }).select("-password");
        req.user = user;
        next();
    } catch (err) {
        res.send(" error something wrong has happened , please try again later");
    }
};