const usermodel = require('../models/user-model');
const bcrypt = require("bcrypt");

async function createuser(email, password, fullname) {
    try {
        const hash = await bcrypt.hash(password, 10);
        const createduser = await usermodel.create({
            fullname,
            email,
            password: hash
        });

        return createduser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
}

module.exports = createuser;
