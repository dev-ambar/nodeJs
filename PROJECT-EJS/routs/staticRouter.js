const express = require("express"); 

const staticRouter =  express.Router();
const {handleGetAlldetails} = require("../controllers/urlController");

staticRouter.get("/",handleGetAlldetails);





module.exports = staticRouter;