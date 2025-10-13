const express = require("express");
const userRouter = express.Router();

const {getAllUsersHandller,getAllUserByIdHandller,
    updateUserByIdHandller,deleteUserByIdHandller,
    createUserHandller} = require("../controllers/user");



// get all users & Create new User

userRouter.route("/").get(getAllUsersHandller).
                        post(createUserHandller);    

//  get user  update user delete by id 

userRouter.route("/:id").get(getAllUserByIdHandller).
                      put(updateUserByIdHandller).
                      delete(deleteUserByIdHandller);   

module.exports = userRouter;