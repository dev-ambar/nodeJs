const express = require("express");

const userRouter = express.Router();

const {handlerUserSignIn,handlerUserSignUp,handlerUserLogout} = require("../controllers/userController");

userRouter.post("/signup",handlerUserSignUp);
userRouter.post("/signin",handlerUserSignIn);
userRouter.get("/logout",handlerUserLogout);

module.exports = userRouter;