const fs = require("fs");

 //fs.writeFileSync("./test.txt","hey i am here");
 //fs.writeFileSync("./test.txt","where are you");
   
 //  read file sysnc and return the result 
 //const result = fs.readFileSync("./Contact.txt","utf-8");
    //console.log(result);
  
 // read the file ansysnc  and so not retun void  of file will get via a call back function 
 fs.readFile("./Contact.txt","utf-8" , (err,result) => 
{
    if(err!=null)
    {
        console.log("there us somne error",err)}

    else
        console.log(result)
});

fs.appendFileSync("./test.txt", `${Date.now().toString()} | my name is ambar\n`);

// create a folder
//s.mkdirSync("classified");

// remove the file 

fs.unlinkSync("./test.txt");