const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");



app.use((req,res,next) =>{

      console.log("middleware 1 called");
      fs.appendFile("./logs.txt",` ${ Date.now()} | ${req.method} | ${req.url}\n`,(err,data )=>{
         next();}
     )
});


app.use((req,res,next) => {

    console.log("middleware 2 called");
    next();
}

);

app.get("/",(req,res)=>{
     
    res.end("Welcome to home Page ");

});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});




