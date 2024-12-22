require('dotenv').config();
const config = require('../config/keys');
const jwt = require('jsonwebtoken');
function generatetoken(user) {
    return jwt.sign({ email: user.email, _id: user._id },process.env.JWT_KEY);
}
module.exports = generatetoken;
