const {Schema,model}  = require('mongoose');

const blogSchema = Schema({
    title:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        required:true,
    },
    coverImagePath:{
        type: String,
        default:"./public/upload/defaultCoverImage.png",
    },  
    authorId:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
},
{timestamps: true               
});

const blogs = model("blogs",blogSchema);

module.exports = blogs;