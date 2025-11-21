const dotenv = require("dotenv");
const express = require("express");
const path = require("path");

const staticRounter = require("./routs/staticRouter");
const userRouter = require("./routs/userRouter");
const connectToDB = require("./config/DbConection");
const {checkCookiesAndAuthentication} = require("./midleware/authentication");
const cookieParser = require("cookie-parser");  
const blogRouter = require("./routs/blogRouter");
const commentRouter = require("./routs/commentRouter");

dotenv.config();

const PORT = process.env.PORT || 3000;


const app = express();

// middlewares

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkCookiesAndAuthentication("auth_token"));
app.use(express.static(path.resolve('./public')));

// connec to databse
// process.env.dbUrl  used to connect local mongo database running on my container
// process.env.DBUrl used to connect to cloud mongo database

connectToDB(process.env.dbUrl||process.env.DBUrl).then(
    () => console.log("Connected to the database")  
).catch((err) => console.log(err));



// set ejs as view Engine

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));



// register routers
app.use("/",staticRounter);
app.use("/users",userRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);


app.listen(PORT,() => {
    console.log(`Server is running on httpp://localhost:${PORT}`)
});



