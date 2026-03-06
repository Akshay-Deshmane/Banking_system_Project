const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")


/** 
  * - UserRegisterController
  * - POST /api/auth/register => api name 
*/
async function userRegisterController(req, res) {

    const { email, password, name } = req.body
    
    // check if the user is already exists or not 
    const isExists = await userModel.findOne({
        email : email
    })

    // if user exists already then return 
    if(isExists) {
        return res.status(422).json({
            message : "user already exists with email.",
            status : "failed"
        })
    }

    // if a user is new then we need to create a new account
    const user = await userModel.create({
        email, password, name
    })

    // create a token for a new user
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn : "3d"})
    
    // save the token in cookies 
    res.cookie("token", token)

    res.status(201).json({
        user : {
            _id : user._id,
            email : user.email,
            name : user.name
        },
        token
    })




}

/**
 * - User Login Controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res) {
    
    // fetch the data of user from the request body 
    const { email, password } = req.body
    
    // find the current user exists in the system or not 
    // using findOne method, finding on basis of email 
    const user = await userModel.findOne({ email }).select("+password")
    
    // if the user is not present in system then return invalid email address
    if(!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    // if the uesr found then comapre the user password with stored passwod in database
    const isValidPassword = await user.comparePassword(password)
    
    // if the user is not valid then return invalid status
    if(!isValidPassword) {
        return res.status(401).json({
            message : "Email or password is Invalid"
        })
    }


    // create a token 
    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn : "3d"})
    
    // save the token in cookies 
    res.cookie("token", token)

    res.status(200).json({
        user : {
            _id : user._id,
            email : user.email,
            name : user.name
        },
        token
    })


}


module.exports = {userRegisterController, userLoginController}