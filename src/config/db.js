const mongoose = require("mongoose")

// creating connectToDB function to connect to Database 
// Always use .env file to store all important data in env file 
 
function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("server is connected to DB")
    })
    .catch(err => {
        console.log("Error connecting to DB")
        process.exit(1)
    })
}

module.exports = connectToDB;