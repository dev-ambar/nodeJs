const fs = require("fs");


function logreqRes(fileName)
{
    return (req,res,next) =>{
          fs.appendFile(fileName,` ${ Date.now()} | ${req.method} | ${req.url}\n`,(err,data) => {
             next();
            }
         )
    }
}

module.exports = { logreqRes,

};

    
