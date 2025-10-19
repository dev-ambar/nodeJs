
const users = require("../models/users.js");

async function handleGetSingUpPage(req,res)
{
    return res.render("userSignUp");
}

async function handleGetSLoginPage(req,res)
{
    return res.render("login");
}


async function handleUserSingUp(req,res)
{
    const  {name,email,password} = req.body;

    if(name == null || email == null ||password == null)
    {
        return res.render("userSignUp",{err:"all field are required for register user"});
    }
    else
    {  
        const userCreated = await users.create({
            name: name,
            email:email,
            password:password
        });

        if(!userCreated)
        {
            return res.render("userSignUp",{err:"there is some issue to rigster user please try after some time"});

        }
        else{

            res.render("login");
        }
        
        
    }
}

async function handleUserLogin(req,res)
{
    const  {email,password} = req.body;

    if(email==null ||password==null)
    {
        return res.render("login",{err:"all field are required for login user"});
    }
    else
    { 
         const isUserExist =  await users.find({email,password});

         console.log("isUserExist",isUserExist);

         if(isUserExist.length >0)
         {  

            res.render("home");
         }
         else
         {
             res.render("login",{err: "either user is and password not match or user is not register with with us please sign up"});
         }
    }
}



module.exports = {handleGetSingUpPage,handleUserSingUp,handleUserLogin,handleGetSLoginPage};