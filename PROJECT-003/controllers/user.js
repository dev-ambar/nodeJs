
const  userModel = require("../models/user");   

async function  getAllUsersHandller(req ,res)
{
    const users = await userModel.find();
     if(users.length > 0)
       return res.status(200).json(users);
     else
          return res.status(404).json({message:"no users found"});
}



async function  getAllUserByIdHandller(req ,res)
{
    const user = await userModel.findById(req.params.id);
     if(user)
     return res.status(200).json(user); 
     else
     return res.status(404).json({message:"no users found"});
}


async function  updateUserByIdHandller(req ,res)
{
  const  updateduser = await userModel.findByIdAndUpdate(req.params.id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender:req.body.gender,
          jobTitle:req.body.jobTitle
     }, {new:true});

     if(updateduser)
     {
          return res.status(200).json({status:"success", message: "user updated successfully", data: updateduser});
     }
     else
     {
         return  res.status(404).json({status:"failed", message: "user not found"});
     } 
}


async function  deleteUserByIdHandller(req ,res)
{
  const deleteduser = await userModel.findByIdAndDelete(req.params.id);
     if(deleteduser)
     {
          res.status(200).json({status:"success", message: "user deleted successfully"});
     }
     else
     {
          res.status(404).json({status:"failed", message: "user not found"});
     } 
}



async function  createUserHandller(req ,res)
{
  if(req.body.firstName == null || req.body.email == null)
     {
          return res.status(400).json({status:"failed", message: "first name & email id are required"});
     }
     else
     {
          await userModel.insertOne({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               gender: req.body.gender,
               jobTitle: req.body.jobTitle

          }).then((data ,err) => {

               if(err)
               {
                    console.log(`error while creating a new user im database : ${err}`);
                      res.status(500).json({status:"failed", message: "internal server error"});
               }
               else
               {
                     res.status(201).json({status:"success", message: "new user created successfully"});
               }
          });
     }
}



module.exports = {getAllUsersHandller,getAllUserByIdHandller,updateUserByIdHandller,deleteUserByIdHandller,createUserHandller};