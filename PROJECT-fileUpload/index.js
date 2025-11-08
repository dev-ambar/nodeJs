const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require("multer");
const { log } = require('console');


app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));



const fileStorage = multer.diskStorage({

    destination : function(req,file,cb){

        return cb(null, "./uploads");

    },
    filename : function(req,file,cb){

        return cb(null, `${Date.now()}-${file.originalname}`);

    },
});

const upload = multer({storage: fileStorage});

app.get("/", (req,res) => {

    return res.render("fileUpload");
    
});

app.post("/fileUpload", upload.single("profileImage"),(req,res) =>{

    console/log(req.file);

    return res.render("fileUpload", {"message": "File uploaded successfully"});
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 











