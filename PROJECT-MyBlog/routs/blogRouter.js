const express = require("express");

const blogRouter = express.Router();
const multer = require('multer');
const path = require('path'); 

const {handlerAddNewBlog,handlerViewBlog} = require("../controllers/blogController");

 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/upload'));
  },
  filename: function (req, file, cb) {
    const fileName =  `${Date.now()}-${file.originalname}`
    cb(null, fileName);
  }
})

const upload = multer({storage: storage})


blogRouter.post("/addNewBlog",upload.single("coverImage"),handlerAddNewBlog);
blogRouter.get("/:blogId",handlerViewBlog);

module.exports = blogRouter;