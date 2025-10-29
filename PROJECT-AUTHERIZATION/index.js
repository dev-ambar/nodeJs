const express = require("express");
const cookieParser =  require("cookie-parser");
const app = express();
const PORT = 8001;
const path = require("path");
const {connectDb} = require("./config/dbConnection");
const staticRouter = require("./routs/staticRouter");
const urlRouter = require("./routs/urlRouter");
const userRouter = require("./routs/userRouter");
const {handleUserAuthentication,restricTo} = require("./midleware/auth");

// connec to databse

connectDb('mongodb://root:example@127.0.0.1:27017/urls?authSource=admin').then(
    () => console.log("Connected to the database")  
).catch((err) => console.log(err));


// set view engine to ejs
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

// Middleware to parse form data 
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(handleUserAuthentication);


// create public routes .
  // landing page like login page & signup page and get  home page 
 app.use("/", staticRouter);

// create routes for user Login  & signUp
 app.use("/users",userRouter);

// whenever we trying to access url data first user should be login 

app.use("/urls",restricTo(["NORMAL"]),urlRouter);




app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${PORT}`);
});



