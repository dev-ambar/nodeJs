const express = require("express"); 

const urlRouter =  express.Router();

const { handllerShortenUrlGenerator,handllerGeturlDetails,handleGetAnalytics,handleGetAlldetails} = require('../controllers/urlController');

// this is route for generating short url


urlRouter.post("/", handllerShortenUrlGenerator);
urlRouter.get("/:shortUrlId", handllerGeturlDetails);
urlRouter.get("/analytics/:shortUrl", handleGetAnalytics);
urlRouter.get("/", handleGetAlldetails);

module.exports = urlRouter;