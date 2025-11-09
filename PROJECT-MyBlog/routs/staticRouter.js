const express = require("express");

const staticRounter = express.Router();


staticRounter.get("/", (req,res) => {
    res.render("home")
});

staticRounter.get("/signup", (req,res) => {
    res.render("signup")
});

staticRounter.get("/signin", (req,res) => {
    res.render("signin")
});

module.exports = staticRounter;