const express = require("express");
const app = express();
const PORT = 8001;
const path = require("path");
const {connectDb} = require("./config/dbConnection");
const staticRouter = require("./routs/staticRouter");
const urlRouter = require("./routs/urlRouter");
const userRouter = require("./routs/userRouter");

// Middleware to parse form data 
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// connec to databse

connectDb('mongodb://root:example@127.0.0.1:27017/urls?authSource=admin').then(
    () => console.log("Connected to the database")  
).catch((err) => console.log(err));


// set view engine to ejs
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));





// create routes for url shortner service.
app.use("/", staticRouter);
app.use("/api/urls/", urlRouter);

// create routes for user Login  & signUp

app.use("/users",userRouter);






app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${PORT}`);
});



