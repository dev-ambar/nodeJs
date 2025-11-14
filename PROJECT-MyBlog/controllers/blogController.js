
const blogs = require("../models/blog");


async function handlerAddNewBlog(req,res)
{   
    const {title,content,coverImage} = req.body;
    const authorId = req.user.id;
     if (!title || !content) {
        return res.render("/blogs//addNewBlog",{error: "Title and content are required."});
     }
     const  coverImagePath  = `/public/upload/${req.file.filename}`;
        
     const blog = await blogs.create({title,content,coverImagePath,authorId}).catch((err) => {
            console.error("Error creating blog:", err);
        });
        return res.redirect("/");  
}

module.exports = {handlerAddNewBlog,};
