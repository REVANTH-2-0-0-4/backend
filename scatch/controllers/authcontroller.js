
const bcrypt = require("bcrypt");
const usermodel = require("../models/user-model");
const generatetoken = require("../utils/generatetoken");

module.exports.createuser  =  async (req, res) => {
    let { fullname, email, password } = req.body;
    let user = await usermodel.findOne({ email: email });
    if (user) {
        res.send("user already exists");
    }
    else {
        try {
            const hash = await bcrypt.hash(password, 10);
            const createduser = await usermodel.create({
                fullname,
                email,
                password: hash
            });
            const token = generatetoken(createduser);
            res.cookie("token", token);
            res.redirect('/users/create')
            return createduser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }

    }
}
