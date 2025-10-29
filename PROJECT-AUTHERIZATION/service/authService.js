

const jsonwebtoken = require("jsonwebtoken");

 const jwtScreat = "AgsgAgAg@#$@)!#)!09876ASDF";


function  setUser(user)
{   
     const userpayload = {
          _id: user._id,
          name:user.name,
          email: user.email,
          role:user.role,
     };

     return  jsonwebtoken.sign(userpayload,jwtScreat);
}

function getUser(token)
{  
   if(!token)
     return null;
   try {

     const user = jsonwebtoken.verify(token,jwtScreat);

     return user;
   }
   catch(error)
   {
     return null;
   }
   

}



module.exports = {setUser,getUser}