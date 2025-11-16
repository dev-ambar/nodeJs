
const blogs = require("../models/blog");
const comments = require("../models/comment");


async function handlerAddNewBlog(req,res)
{   
    const {title,content,coverImage} = req.body;
    const authorId = req.user.id;
     if (!title || !content) {
        return res.render("/blogs/addNewBlog",{error: "Title and content are required."});
     }
     const  coverImagePath  = (req.file)?`/upload/${req.file.filename}` : "/upload/defaultCoverImage.webp";
        
     const blog = await blogs.create({title,content,coverImagePath,authorId}).catch((err) => {
            console.error("Error creating blog:", err);
        });
        return res.redirect(`/blogs/${blog._id}`);  
}

async function handlerViewBlog(req,res)
{   
    const blog = await blogs.findById(req.params.blogId).populate("authorId").catch((err) => {
        console.error("Error fetching blog:", err);
    });
     const blogCommnets = await comments.find({blogId:req.params.blogId}).populate("authorId").catch((err) => {
        console.error("Error fetching blog comments:", err);
    });
    return res.render("viewBlog",{blog,user:req.user,comments:blogCommnets});
}

module.exports = {handlerAddNewBlog,handlerViewBlog};
