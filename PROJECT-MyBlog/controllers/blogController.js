const users = require("../models/user");

async function handlerAddNewBlog(req,res)
{   
     console.log("Add new blog request body:", req.body); // Debugging line

    return res.redirect("/");
}

module.exports = {handlerAddNewBlog,};
