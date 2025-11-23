const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const port = 3000;
const{Server} = require('socket.io'); 


app.use(express.static('/public'));


app.get('/', (req, res) => {
  return res.sendFile(path.resolve("./public/index.html"));
});




const server = http.createServer(app);

const io = new Server(server);  

io.on("connection", (socket) => {
    socket.on("user-message", (msg) => {
        io.emit("server-message", msg);
  });
});


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});