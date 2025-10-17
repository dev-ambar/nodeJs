const express = require("express"); 

const urlRouter =  express.Router();

const { handllerShortenUrlGenerator,handllerGeturlDetails,handleGetAnalytics} = require('../controllers/urlController');

// this is route for generating short url


urlRouter.post("/", handllerShortenUrlGenerator);
urlRouter.get("/:shortUrlId", handllerGeturlDetails);
urlRouter.get("/analytics/:shortUrlId", handleGetAnalytics);







module.exports = urlRouter;