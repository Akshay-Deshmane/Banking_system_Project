const express = require('express')
const authController = require("../controllers/auth.controller")
const router = express.Router()


// API NAME => post/api/auth/register
router.post("/register", authController.userRegisterController)


//POST => post/api/auth/login
router.post("/login", authController.userLoginController)

module.exports = router