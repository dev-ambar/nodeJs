const express = require("express");

const staticRounter = express.Router();

const blogs = require("../models/blog");


staticRounter.get("/", (req,res) => {

    const allBlogs = blogs.find().populate("authorId").sort({createdAt: -1}).then((blogs) => {
        res.render("home",{user: req.user, blogs: blogs});
    }).catch((err) => {
        console.error("Error fetching blogs:", err);
        res.render("home",{user: req.user, blogs: []});
    });
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