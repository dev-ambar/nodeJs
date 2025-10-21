
const mongoos = require("mongoose");

const userSchema = new mongoos.Schema({

    name:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique: true,
    },
    password:{

        type: String,
    }
    },
    {timestamps:true
    }
);

 const  users = mongoos.model("users",userSchema);


 module.exports = users;








