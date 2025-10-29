
const {getUser} = require("../service/authService");

 async function restictToUserWithOutLogin(req,res,next)
 {  

    const authToken = req.headers["authorization"];
    
    if(!authToken);
    {
        return res.redirect("/users/login"); 
    }

    const token = authToken?.split("Bearer")[1];

    if(!token)
    {
      return res.redirect("/users/login");
    }
    
    const user = getUser(token.trim());

    if(!user)
    {
      return res.redirect("/users/login");
    }

    next.user = user ;

    next();

 }

    async function checkAuth(req,res,next) 
    {    
      const authToken = req.headers["authorization"];

      const token  = authToken?.split("Bearer")[1];

        const user = getUser(token.trim());
             
        req.user = user;
             next();  

    }

    module.exports = {checkAuth,restictToUserWithOutLogin}