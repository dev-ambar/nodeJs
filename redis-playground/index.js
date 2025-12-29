const express = require('express');
const axios = require('axios');
const Redis = require('ioredis');

const app = express();
const redis = new Redis();

const PORT = process.env.PORT || 3000;


app.get("/", async(rer, res) =>{

    const cachedTodo = await redis.get("todos");
    if(cachedTodo){
        return res.send(JSON.parse(cachedTodo));
    }
   
    const todo = (await axios.get("https://jsonplaceholder.typicode.com/todos")).data;
    await redis.set("todos",JSON.stringify(todo), 'EX', 60);
    res.json(todo);
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});