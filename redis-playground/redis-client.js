const redits = require("ioredis");


// create clint 

const client = new redits();

client.on("connect", function() {
    console.log("Redis client connected");
});

client.on("error", function (err) {
    console.log("Something went wrong " + err);
});

module.exports = client;