
const users = require("../models/user");
const { generateToken ,validateToken} = require("../services/authetication");

async function handlerUserSignUp(req,res)
{   
     const {fullName,email,password} = req.body;

     if(!email || !password || !fullName)
     {
        return res.render("signup",{error:"All fields are mendatory"});
     }
    
     const newUser = await users.create({fullName,email,password}).catch((err) => {
        return res.render("signup",{error:"something went wrong please try again later"});
     });

    if(!newUser)
        return res.render("signup",{error:"something went wrong please try again later"});

    return res.redirect("/signin");
}

async function handlerUserSignIn(req, res) {   
  
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("signin", { error: "All fields are mandatory" });
    }
try {
    const user = await users.isPasswordValid(email, password);
    
    // Generate JWT token
    const token = generateToken(user);

    // If valid, redirect to homepage with token in cookie
    
    res.cookie("auth_token",token);
    
    return res.redirect("/");

  } catch (err) {
    return res.render("signin", { error: err.message });
  }
}

async function handlerUserLogout(req, res) {   
  
try {
      
    res.clearCookie("auth_token").redirect("/")
    
  } catch (err) {
    console.error("Error during logout:", err); // Debugging line
    return res.redirect("/");
  }
}




module.exports = {handlerUserSignUp,handlerUserSignIn,handlerUserLogout};