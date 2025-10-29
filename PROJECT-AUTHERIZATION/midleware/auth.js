
const {getUser} = require("../service/authService");

 
 function  handleUserAuthentication(req,res,next)
 { 
   req.user = null;
     
  const userToken  = req.cookies?.uuid;
   
  if(!userToken)
    return next();

  const user = getUser(userToken);
  if(!user)
    return next();

  req.user = user;

    return next();

 }
    
 function restricTo( roles = [])
 {
     return function(req,res,next)
     {
          if(!req.user)
            return res.redirect("/users/login");
          if(!roles.includes(req.user.role))
            return  res.render("login",{err: `${req.user} is not Authorized to access`});

          return next();

     };
 }
    


    module.exports = {restricTo,handleUserAuthentication}