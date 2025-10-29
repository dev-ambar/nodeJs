

const jsonwebtoken = require("jsonwebtoken");

 const jwtScreat = "AgsgAgAg@#$@)!#)!09876ASDF";


function  setUser(user)
{   
     const userpayload = {
          _id: user._id,
          name:user.name,
          email: user.email,
     };

     return  jsonwebtoken.sign(userpayload,jwtScreat);
}

function getUser(token)
{  
   if(!token)
     return null;
   try {
    console.log("getUSer Token ",token);
     const user = jsonwebtoken.verify(token,jwtScreat);
     console.log("user",user);
     return user;
   }
   catch(error)
   {
     console.log("error",error);
     return null;
   }
   

}



module.exports = {setUser,getUser}