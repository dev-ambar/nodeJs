const express = require("express");

const commnetRouter = express.Router();

const {handlerAddComment} = require("../controllers/commentController");

commnetRouter.post("/:blogId",handlerAddComment);

module.exports = commnetRouter;