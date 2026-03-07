const accountModel = require("../models/account.models");

// api = post/api/accounts/
async function createAccountController(req, res) {

    const user = req.user;

   // create a new account 
    const account = await accountModel.create({
        user : user._id
    })

    // return the response to the uer that account is created 
    res.status(201).json({
        account
    })

}


module.exports = {createAccountController}