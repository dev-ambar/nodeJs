const http = require("http");


const myServer = http.createServer((req,res) => {

    console.log("new request recieved");  
    res.end("hello from myServer");

});

myServer.listen(8080,()=> {
    console.log("Server is running on port 8080")
});