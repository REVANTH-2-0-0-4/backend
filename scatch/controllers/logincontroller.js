const generatetoken = require("../utils/generatetoken");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
module.exports.login = async  (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await usermodel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = generatetoken(user);
                    res.cookie("token", token);
                    res.redirect('/');
                }
                else {
                    res.status(500).send("something went wrong please try again later1");
                }
            })

        }
    }
    catch (err) {
        res.status(500).send("something went wrong please try again later2");
    }


}