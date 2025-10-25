const express = require("express"); 

const staticRouter =  express.Router();
const {handleGetAlldetails} = require("../controllers/urlController");
const {handleGetSingUpPage,handleGetSLoginPage} = require("../controllers/userController");

 staticRouter.get("/", handleGetAlldetails);

staticRouter.get("/users/signup",handleGetSingUpPage);
staticRouter.get("/users/login",handleGetSLoginPage);





module.exports = staticRouter;