require("dotenv").config();
const app = require('./src/app')
const connectToDB = require("./src/config/db")

// calling connectToDb function to connect to database 
connectToDB();



app.listen(3000, () => {
    console.log("server is started correctly")
})

