
const {getUser} = require("../service/authService");

async function restictToUserWithOutLogin(req,res,next) 

    {  
         const sessionID = req.cookies?.uuid;

         if(!sessionID)
         {  
            console.log("user not login ");
            return res.redirect("/users/login");
         }
    
        const user = getUser(sessionID);

            if(!user)
            {   
                console.log("user not exist ");
                return res.redirect("/users/login"); 
            }

             console.log("user  login ");
             req.user = user;
             next();  

    }

    async function checkAuth(req,res,next) 

    {  
         const sessionID = req.cookies?.uuid;
    
        const user = getUser(sessionID);
             req.user = user;
             next();  

    }

    module.exports = {restictToUserWithOutLogin,checkAuth}