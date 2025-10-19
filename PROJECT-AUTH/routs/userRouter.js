const express = require("express");
const userRouter = express.Router();

const {handleGetSingUpPage,handleUserSingUp,handleUserLogin} = require("../controllers/userController");


  userRouter.get("/singUp",handleGetSingUpPage);

  userRouter.post("/singUp",handleUserSingUp);

  userRouter.post("/login",handleUserLogin);




module.exports = userRouter;





