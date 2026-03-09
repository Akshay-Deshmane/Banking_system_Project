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


async function getUserAccountsController(req, res) {
    const accounts = await accountModel.find({ user : req.user._id });

    return res.status(200).json({
        accounts
    })
}


async function getAccountBalanceController(req, res) {
    const { accountId } = req.params;

    const account = await accountModel.findOne({
        _id : accountId,
        user : req.user._id
    })

    if(!account) {
        return res.status(404).json({
            message : "Account not found"
        })
    }

    const balance = await account.getBalance();

    return res.status(200).json({
        accountId : account._id,
        balance : balance
    })
}


module.exports = {createAccountController, getUserAccountsController, getAccountBalanceController}