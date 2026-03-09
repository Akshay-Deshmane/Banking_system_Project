const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blackList.model")


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

    const isBlacklisted = await tokenBlackListModel.findOne({token})

    if(!isBlacklisted) {
        return res.status(401).json({
            message : "Unauthorized access, token is invalid"
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


async function authSystemUserMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token) {
        return res.status(401).json({
            message : "Unauthorized access, token is missing"
        })
    }

    const isBlacklisted = await tokenBlackListModel.findOne({token})

    if(!isBlacklisted) {
        return res.status(401).json({
            message : "Unauthorized access, token is invalid"
        })
    }


    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET)

       const user = await userModel.findById(decoded.userId).select("+systemUser")

       if(!user.systemUser) {
        return res.status(403).json({
            message : "Forbidden access, not a system user"
        })
       }

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
    authMiddleware,
    authSystemUserMiddleware
}

