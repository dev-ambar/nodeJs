const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const { json } = require("stream/consumers");

const mongoose = require("mongoose");
const { time } = require("console");

// create a database connection
mongoose.connect('mongodb://root:example@127.0.0.1:27017/myDatabase?authSource=admin').then(() => console.log("connected with database")).
catch((err) => console.log(err));

app.use(express.urlencoded({extended:false}));

// create auser schema

   const myschema = new  mongoose.Schema(
     {
         firstName:{
           type:String,
           required:true
         },
         lastName:{
          type:String
         },
         email:{
          type: String,
          required:true,
          unique:true
         },
         gender:{
          type:String
         },
         jobTitle:{
          type:String   
         },
           createdAt:{
            type:Date,
            default:Date.now
           }
     }
   );

   // create a user model     

   const userModel = mongoose.model("users",myschema);


// get all users

app.get("/api/users",async(req,res)=>{

     const users = await userModel.find();
     if(users.length > 0)
      res.status(200).json(users);
     else
          res.status(404).json({message:"no users found"});
});


// get user by id 
app.get("/api/users/{:id}",async(req,res)=>{

     const user = await userModel.findById(req.params.id);
     if(user)
     res.status(200).json(user); 
     else
     res.status(404).json({message:"no users found"});
});


// create new user

app.post("/api/users",async(req,res) =>{
   
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

);

// use put method to update user

app.put("/api/users/{:id}",async(req,res) => {

     const  updateduser = await userModel.findByIdAndUpdate(req.params.id, {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          gender:req.body.gender,
          jobTitle:req.body.jobTitle
     }, {new:true});

     if(updateduser)
     {
          res.status(200).json({status:"success", message: "user updated successfully", data: updateduser});
     }
     else
     {
          res.status(404).json({status:"failed", message: "user not found"});
     }    
} 
      
);

// use delete  method to delete user from database

app.delete("/api/users/{:id}",async(req,res) => {
  
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
);

// default route
app.get("/",(req,res) => {
     res.send("hello from useer API  server ");
});

app.listen(port, () => {console.log(`server is startting on port: ${port} suceesfully`)}
);