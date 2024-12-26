const generatetoken = require("../utils/generatetoken");
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
module.exports.login = async  (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await usermodel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error("Error while comparing passwords:", err);
                    return res.status(500).send("Internal Server Error");
                }
    
                if (result) {
                    const token = generatetoken(user);
                    res.cookie("token", token);
                    console.log(token);
                    res.redirect('/shop');
                }
                else {
                    res.status(401).send("invalid email or password");
                }
            })

        }
    }
    catch (err) {
        res.status(500).send("something went wrong please try again later2");
    }


}