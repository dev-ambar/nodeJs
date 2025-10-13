const express = require("express");
const app = express();
const port = 8000;
const {connectDb} = require("./config/dbConnection");
const {logreqRes} = require("./middleware");
const userRouter = require("./routs/user");

// connect with database
 connectDb('mongodb://root:example@127.0.0.1:27017/myDatabase?authSource=admin').then(() => console.log("connected with database")).
 catch((err) => console.log(err));


// use middleware to parse request body
  app.use(express.urlencoded({extended:false}));

  // use middleware to logs request & response
  
  app.use(logreqRes("log.txt"));

  // user router
  
  app.use("/api/users",userRouter);

app.listen(port, () => {console.log(`server is startting on port: ${port} suceesfully`)}
);