const express = require("express");

const staticRounter = express.Router();


staticRounter.get("/", (req,res) => {
    res.render("home",{user: req.user});
});

staticRounter.get("/addNewBlog", (req,res) => {
    res.render("addBlog",{user: req.user});
});

staticRounter.get("/signup", (req,res) => {
    res.render("signup");
});

staticRounter.get("/signin", (req,res) => {
    res.render("signin");
});

module.exports = staticRounter;