const express = require("express");
const app = express();
const PORT = 8001;
const {connectDb} = require("./config/dbConnection");;
const urlRouter = require("./routs/urlRouter");


// Middleware to parse JSON bodies

app.use(express.json());

// connec to databse

connectDb('mongodb://root:example@127.0.0.1:27017/urls?authSource=admin').then(
    () => console.log("Connected to the database")  
).catch((err) => console.log(err));



// create routes for url shortner service.

app.use("/api/urls", urlRouter);






app.listen(PORT, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${PORT}`);
});



