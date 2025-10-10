const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

const myServer = http.createServer((req,res) => {
     
     const parseUrl = url.parse(req.url,true);
     const logInput= `new request recieved from client at Date :${Date.now().toString()} | from path:${parseUrl.pathname} | have search Parameter ${parseUrl.search}|\n`; 
      fs.appendFile("./logs/serverLogs.txt",logInput,(err,data) => {

        if(err!=null)
        {
            console.log("Error in writing to log file "+err);
        }
        else
        {   
            const pathname = parseUrl.pathname
            
            switch(pathname)
            {
                case "/":
                
                    res.end("<h1>Welcome to Home Page</h1>");
                    break; 
                case "/about":
                    res.end("<h1>Welcome to About Page</h1>");
                    break; 
                case "/contact":
                    res.end("<h1>Welcome to Contact Page</h1>");
                    break; 
                default:
                    res.end("<h1>404 Page Not Found</h1>");
                    break;   
            
            }

        }

      });

});

myServer.listen(8080,()=> {
    console.log("Server is running on port 8080")
});