
const users = require("../models/users.js");

const {v4:uuid} = require("uuid");

const {setUser,getUser} = require("../service/authService.js");


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

            res.redirect("/users/login");
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
         const isUserExist =  await users.findOne({email,password});

         if(!isUserExist)
         {  

            res.render("login",{err: "UserName & Password combination is invalid please try again !!"});
         }
         else
         {     
            const jwtToken =  setUser(isUserExist);
            
            res.cookie("uuid",jwtToken);
                     
            res.render("home",{userName:isUserExist.name})
            
         }
    }
}



module.exports = {handleGetSingUpPage,handleUserSingUp,handleUserLogin,handleGetSLoginPage};