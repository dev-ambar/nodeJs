
const {getUser} = require("../service/authService");

async function restictToUserWithOutLogin(req,res,next) 

    {  
         const sessionID = req.cookies?.uuid;

         console.log("userSessionid",sessionID);

         if(!sessionID)
         {  
             console.log("user not login ");
            return res.redirect("login");
         }
    
        const user = getUser(sessionID);

            if(!user)
            {   
                console.log("user not exist ");
                return res.redirect("login"); 
            }

             console.log("user  login ");
             req.user = user;
             next();  

    };

    module.exports = {restictToUserWithOutLogin,}