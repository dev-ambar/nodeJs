const express = require("express");

const userRouter = express.Router();

const {handlerUserSignUp,handlerUserSignIn} = require("../controllers/userController");


userRouter.post("/signup",handlerUserSignUp);
userRouter.post("/signin",handlerUserSignIn);

module.exports = userRouter;