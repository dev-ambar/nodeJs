const client = require('./redis-client');

// set and get example


async function init (){

     const result = await client.get("user:3");
     console.log(result);

      await client.set("msg:6", "Hello World from Redis");
      client.expire("msg:6", 20);
      const msg = await client.get("msg:6");
      console.log(msg);

}

init();