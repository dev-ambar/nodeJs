
const mongoose = require('mongoose');

// Create URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    vistHistory: [
        {
            type: Date,
            default: Date.now
        }
    ],
    createdBy:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "users",

    }
},{timestamps:true});

// Create URL model
const urlModel = mongoose.model('urls', urlSchema);

module.exports = urlModel;