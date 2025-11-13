
const { validateToken } = require("../services/authetication");

function checkCookiesAndAuthentication(cookiesName)
{
    return function (req,res,next)
        {  
            const token = req.cookies[cookiesName];
             if(!token)
             {  
                 return next();
             }  
             
             try{
                const userPayload = validateToken(token);
                req.user = userPayload;             
             }
             catch(err)
             {
                
             }

              next();
             
            
        };
}

 module.exports = {checkCookiesAndAuthentication,};