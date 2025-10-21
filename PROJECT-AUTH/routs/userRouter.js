const express = require("express");
const userRouter = express.Router();

const {handleGetSingUpPage,handleUserSingUp,handleUserLogin} = require("../controllers/userController");


  userRouter.post("/singUp",handleUserSingUp);

  userRouter.post("/login",handleUserLogin);




module.exports = userRouter;





