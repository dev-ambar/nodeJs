const express = require("express");
const path = require("path");

const staticRounter = require("./routs/staticRouter");
const userRouter = require("./routs/userRouter");
const connectToDB = require("./config/DbConection");

const PORT = 8000;

const app = express();

app.use(express.urlencoded({extended:false}));

// connec to databse

connectToDB('mongodb://root:example@127.0.0.1:27017/blogify?authSource=admin').then(
    () => console.log("Connected to the database")  
).catch((err) => console.log(err));



// set ejs as view Engine

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));



// register routers
app.use("/",staticRounter);
app.use("/users",userRouter);


app.listen(PORT,() => {
    console.log(`Server is running on httpp://localhost:${PORT}`)
});



