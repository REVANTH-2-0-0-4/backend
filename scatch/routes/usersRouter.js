const express = require("express");
const router = express.Router();
const { createuser } = require("../controllers/authcontroller");
const {login} = require("../controllers/logincontroller");
router.get('/', (req, res) => {
    res.send("everything working fine");
})
router.post('/register', createuser)
router.post('/login',login)
router.get('/logout', (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
})
module.exports = router;
