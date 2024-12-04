const mongoose = require("mongoose")

async function DBconnection(url) {
    return mongoose.connect(url) 
}

module.exports = {
    DBconnection
}