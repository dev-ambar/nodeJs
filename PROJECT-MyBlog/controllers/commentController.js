
const comments = require("../models/comment");


async function handlerAddComment(req,res)
{   
    const content = req.body.content;
    const authorId = req.user.id;
    const blogId = req.params.blogId;
     const comment = await comments.create({content,authorId,blogId}).catch((err) => {
            console.error("Error adding  comment:", err);         
        });
        return res.redirect(`/blogs/${blogId}`);  
}


module.exports = {handlerAddComment};
