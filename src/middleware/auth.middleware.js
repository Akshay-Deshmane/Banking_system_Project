const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")



// middleware to check is user logged in the system or not by checking the token we can do it 

async function authMiddleware(req, res, next) {

    // checking if the token found in the cookie or in header file 
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    // if token not found then user is not logged in 
    if(!token) {
        return res.status(401).josn({
            message : "Unauthorized access, token is missing"
        })
    }


    // if the token found then verfiy that token in the stored token in the db
    try{ 
       
        // verfiy the user in system
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // find the matching user in the system 
        const user = await userModel.findById(decoded.userId)

        // store it in req.user 
        req.user = user

        return next()

    } 
    catch(err) {
        return res.status(401).json({
            message : "Unauthorized access, token is invalid"
        })
    }

}


module.exports = {
    authMiddleware
}

