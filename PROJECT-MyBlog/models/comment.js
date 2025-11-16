const {Schema,model}  = require('mongoose');

const commentSchema = Schema({
    content:{
        type: String,
        required:true,
    }, 
    authorId:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    blogId:{
        type: Schema.Types.ObjectId,
        ref:"blogs",
        required:true,
    },
},
{timestamps: true               
});

const comments = model("comments",commentSchema);

module.exports = comments;