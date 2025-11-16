const {Schema,model}  = require('mongoose');
const {createHmac,randomBytes} = require('node:crypto');

const userSchema = Schema({
    fullName:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
    },
    salt:{
        type: String,
    },
    password:{
        type: String,
        required:true,
    },
    profileImagePath:{

        type: String,
        default:"/images/user-defaultProfile.png",
    },
    role:{
        type: String,
        enum:["USER","ADMIN"],
        default:"USER",
    }  

},
{timestamps: true});

// create pre save hook to hash password

userSchema.pre("save", function(next) {

    const user = this;
  
    if(!user.isModified("password"))
        return ;
    const salt = randomBytes(16).toString();
    const hashedPasssword = createHmac("sha256",salt).update(user.password).digest("hex");
    this.salt = salt;
    this.password = hashedPasssword;
  next();
});

// create vertual method to validate password

userSchema.static("isPasswordValid", async function(email,password) {
  
    const user = await this.findOne({email});
    if(!user)
        throw new Error("User not found");

    const salt = randomBytes(16).toString();
    const userProvidedPwdHash = createHmac("sha256",user.salt).update(password).digest("hex");
    if(userProvidedPwdHash!==user.password)
    {     
         throw new Error("Password not found");  
    }
       
  // Convert  MONGO USER DOCUMENT to plain object, then remove sensitive fields
     const userObj = user.toObject();
    delete userObj.password;
    delete userObj.salt;

  return userObj;
       
});

const users = model("users",userSchema);

module.exports = users;
