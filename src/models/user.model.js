const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// creating a user schema
const userSchema = new mongoose.Schema({
    email:{
        type : String, 
        required : [true, "Email is required for creating a user"],
        // to remove the empty spaces between the password
        trim : true,
        lowercase : true,
        // match is used to check given email is in standard email formate or not 
        match : [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,"Invalid Email Address"],
        unique : [true, "Email already exists"]
    }, 
    name : {
        type : String, 
        required : [true, "Name is required for creating an account"]
    },
    password : {
        type : String, 
        required : [true, "Password is required for creating an account"],
        minlength : [6, "Password should be more than 6 characters"],
        select : false
    },
    systemUser : {
        type : Boolean, 
        default : false,
        immutable : true,
        select : false
    }
}, {
    timestamps : true
})


// some pre authorization befor saving the changes in db
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return 
    }

    // hash the password and then save it to db
    // first hash the password 
    const hash = await bcrypt.hash(this.password, 10)
    // then replace the original password with new hashed password
    this.password = hash

    return 
})


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel






