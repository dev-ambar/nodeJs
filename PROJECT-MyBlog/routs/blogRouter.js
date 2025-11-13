const express = require("express");

const blogRouter = express.Router();

const {handlerAddNewBlog} = require("../controllers/blogController");

blogRouter.post("/addNewBlog",handlerAddNewBlog);

module.exports = blogRouter;