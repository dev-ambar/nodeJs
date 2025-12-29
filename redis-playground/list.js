const client = require('./redis-client');

// set and get example


async function init (){
      
    

    await client.lpush("tasks", "task1");
    await client.lpush("tasks", "task2");
    await client.lpush("tasks", "task3");

    const task = await client.lpop("tasks");
    //console.log("Popped task: " + task);

    const tasks = await client.lrange("tasks", 0, -1);
    console.log(tasks);

}

init();