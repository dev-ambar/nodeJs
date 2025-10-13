const mongoose = require("mongoose");


// create user schema

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

    module.exports = userModel;