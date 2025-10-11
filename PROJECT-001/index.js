const express = require("express");
const app = express();
const port = 8000;
const users = require("./users.json");
const fs = require("fs");
const { json } = require("stream/consumers");

app.use(express.urlencoded({extended:false}));

// create all API end points

// get when any  browser request is made
app.get("/users",(req,res)=>{
    
      const html  = `
      <ul>
           ${users.map((user) => `<li>${user.first_name}</li>`).join("")}           
      /<ul>`

      res.send(html);  

});

// get when any non browser request is made



app.get("/api/users",(req,res)=>{
    res.json(users)

});


// get user by id 
app.get("/api/users/{:id}",(req,res)=>{
    
     return res.json(users.find((user) => user.id === parseInt(req.params.id))); 
  
});


// create new user

app.post("/api/users",(req,res) =>{

   const newUser = req.body
   
     users.push({...newUser ,id: users.length + 1});
     fs.writeFile("./users.json", JSON.stringify(users), (err,data) =>  {
          
          if(err)
          {
               comsole.log(err)
          }
          else
               return res.json({status: "sucsses", message: `new user added successfully with  id : ${users.length}`});

     });  
   
}

);

// use put method to update user

app.put("/api/users/{:id}",(req,res) => {
  
      //read exisitng file  

      fs.readFile("./users.json", "utf-8", (err,data) =>{
              
          if(err)
          {
               console.log(`error while reading the file :${err}`)
          }
          else
          {
               const users = JSON.parse(data);
               const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
               if(userIndex === -1)
               {
                    console.log(`user with id ${req.params.id} not found`)
               }
               else
               {
                    const updatedUser = {...users[userIndex], ...req.body}
                    console.log(updatedUser);    
                    console.log(users[userIndex]);
                    users[userIndex] = updatedUser;
                    fs.writeFile("./users.json", JSON.stringify(users), (err,data) =>  {

                         if(err)
                         {
                              console.log(`error while writing the file :${err}`);
                         }
                         else
                         {
                              return res.json({status: "sucsses", message: `user with id : ${req.params.id} updated successfully`});
                         }

                    });
               }


          }

      })
     
}
);

// use delete  method to delete user from file

app.delete("/api/users/{:id}",(req,res) => {
  
      //read exisitng file  

      fs.readFile("./users.json", "utf-8", (err,data) =>{
              
          if(err)
          {
               console.log(`error while reading the file :${err}`)
          }
          else
          {
               const users = JSON.parse(data);
               const userIndex = users.findIndex((user) => user.id === parseInt(req.params.id));
               if(userIndex === -1)
               {
                    console.log(`user with id ${req.params.id} not found`)
               }
               else
               {
                    users.splice(userIndex,1);

                    fs.writeFile("./users.json", JSON.stringify(users), (err,data) =>  {

                         if(err)
                         {
                              console.log(`error while writing the file :${err}`);
                         }
                         else
                         {
                              return res.json({status: "sucsses", message: `user with id : ${req.params.id} deleted successfully`});
                         }

                    });
               }


          }

      })
     
}
);


app.listen(port, () => {console.log(`server is startting on port: ${port} suceesfully`)}
);