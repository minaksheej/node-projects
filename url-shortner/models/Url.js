const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type : String, 
        required : true,
        unique: true
    }, 
    redirectUrl: {
        type: String
    }, 
    visitHistory: [{
        timeStamp: {
            type: Number
        }
    }]

},{timeStamp: true});


//create Model
const URL= mongoose.model("url", urlSchema);

module.exports = URL;