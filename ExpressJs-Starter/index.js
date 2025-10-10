const express = require('express');

const  app = express();

app.get('/' ,(req, res) => {
   
    res.send(` Hi ${req.query.name} ! welcome to our Home Page`)
}
);

app.get('/aboutus' ,(req, res) => {
   
    res.send(' welcome to About US Page')
}
);

app.listen(8080,() =>{
    console.log('server is running on port 8080');  
})
