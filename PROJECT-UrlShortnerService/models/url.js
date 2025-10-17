
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create URL model
const urlModel = mongoose.model('urls', urlSchema);

module.exports = urlModel;