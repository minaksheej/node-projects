const mongoose = require('mongoose');

async function connectMongoDB(url) {
    //connection to mongoDb
    return mongoose.connect(url);    
};

module.exports = {
    connectMongoDB,
};