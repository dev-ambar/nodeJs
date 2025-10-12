const express = require("express");
const app = express();
const port = 8000;
const users = require("./users.json");
const fs = require("fs");
const { json } = require("stream/consumers");

const mongoose = require("mongoose");
const { time } = require("console");

const conn = mongoose.connect('mongodb://root:example@127.0.0.1:27017/myDatabase?authSource=admin').then(() => console.log("connected with database")).
catch((err) => console.log(err));

app.use(express.urlencoded({extended:false}));



// create all API end points



// get when any non browser request is made
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

   const userModel = mongoose.model("users",myschema);



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

          }).then((err ,data) => {

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

app.put("/api/users/{:id}",(req,res) => {
  
      //read exisitng file  

      fs.readFile("./users.json", "utf-8", (err,data) =>{
              
          if(err)
          {
               console.log(`error while reading the file :${err}`)
          }
          else
          {
               const users = JSON.parse(data);
               const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
               if(userIndex === -1)
               {
                    console.log(`user with id ${req.params.id} not found`)
               }
               else
               {
                    const updatedUser = {...users[userIndex], ...req.body}
                    console.log(updatedUser);    
                    console.log(users[userIndex]);
                    users[userIndex] = updatedUser;
                    fs.writeFile("./users.json", JSON.stringify(users), (err,data) =>  {

                         if(err)
                         {
                              console.log(`error while writing the file :${err}`);
                         }
                         else
                         {
                              return res.json({status: "sucsses", message: `user with id : ${req.params.id} updated successfully`});
                         }

                    });
               }


          }

      })
     
}
);

// use delete  method to delete user from file

app.delete("/api/users/{:id}",(req,res) => {
  
      //read exisitng file  

      fs.readFile("./users.json", "utf-8", (err,data) =>{
              
          if(err)
          {
               console.log(`error while reading the file :${err}`)
          }
          else
          {
               const users = JSON.parse(data);
               const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
               if(userIndex === -1)
               {
                    console.log(`user with id ${req.params.id} not found`)
               }
               else
               {
                    users.splice(userIndex,1);

                    fs.writeFile("./users.json", JSON.stringify(users), (err,data) =>  {

                         if(err)
                         {
                              console.log(`error while writing the file :${err}`);
                         }
                         else
                         {
                              return res.json({status: "sucsses", message: `user with id : ${req.params.id} deleted successfully`});
                         }

                    });
               }


          }

      })
     
}
);


app.listen(port, () => {console.log(`server is startting on port: ${port} suceesfully`)}
);