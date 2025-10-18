
const shortid = require("shortid");

const urlModel = require("../models/url");


async function handllerShortenUrlGenerator(req, res) {
    // Logic for generating a shortened URL
    const url  = req.body.originalUrl;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    // Here you would typically generate a short URL and save it to the database
    const shortUrl =  shortid.generate(url);
    console.log(`Generated short URL: ${shortUrl} for  URL: ${url}`);

    // Save to database
    const entry = urlModel.create({
        originalUrl: url,
        shortUrl: shortUrl,
        vistHistory: []
    }).catch((err) => {
        console.log("Error in saving to database", err);
        return res.render('home', { error: "Internal Server Error" });  
    });        

    // Respond with the shortened URL
      res.render('home', {shortUrl: shortUrl});
}

async function handllerGeturlDetails(req, res) {

     if(!req.params.shortUrlId)
     {
        return  res.status(400).json({ error: "Short URL is required" });
     }
     const shortUrl = req.params.shortUrlId
     console.log(`Fetching details for short URL: ${shortUrl}`);
     
     const urlDetails = await urlModel.findOneAndUpdate(
            {shortUrl}, 
        
            { 
                $push:{ 
                    vistHistory: Date.now() 

                } 
            }
        
     ).catch((err) => {
        console.log("Error in fetching from database", err);  
        return res.status(500).json({ error: "Internal Server Error" });  
     });

     if (!urlDetails.shortUrl) {
        return res.status(404).json({ error: "Short URL not found" });
     }
     else
     {   
       console.log(urlDetails.originalUrl);
        return res.status(200).redirect(urlDetails.originalUrl);
     }

}


async function handleGetAlldetails(req, res) {

     
     const urlDetails = await urlModel.find({})
    .catch((err) => {
        console.log("Error in fetching  data from database", err);  
        return res.status(500).json({ error: "Internal Server Error" });  
     });

     if (!urlDetails) {
        return res.status(404).json({ error: "No data found" });
     }
     else
     {
        res.render('home', {urlDetails: urlDetails});
     }
   }

     async function handleGetAnalytics(req, res) {

     if(!req.params.shortUrlId)
     {
        return  res.status(400).json({ error: "Short URL is required" });
     }
     const shortUrl = req.params.shortUrlId
     console.log(`Fetching analytics for short URL: ${shortUrl}`);
     
     const urlDetails = await urlModel.findOne(
            {shortUrl}
        
     ).catch((err) => {
        console.log("Error in fetching  Analytics from database", err);  
        return res.status(500).json({ error: "Internal Server Error" });  
     });

     if (!urlDetails) {
        return res.status(404).json({ error: "No data found" });
     }
     else
     {
        return res.status(200).json({"ShotrURL": shortUrl, "VisitHistory": urlDetails.vistHistory, "TotalVisits": urlDetails.vistHistory.length});
     }


}

module.exports = { handllerShortenUrlGenerator,handllerGeturlDetails,handleGetAnalytics,handleGetAlldetails};