const mongoose = require("mongoose")
const ledgerModel = require("../models/ledger.models")


// creating an account schema
const accountSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : [true, "Account must be associated with a user"],
        index : true
    },
    status : {
        type : String, 
        enum : {
            values : ["ACTIVE", "FROZEN", 'CLOSED'],
            message : "status can be either ACTIVE, FROZEN or CLOSED"
        },
        default : "ACTIVE"
    },
    currency : {
        type : String, 
        required : [true, "Currency is required for creating an account"],
        default : "INR"
    }
}, {
    timestamps : true
})


accountSchema.index({user : 1, status : 1})


// accountSchema.methods.getBalance = async function(){
   
//     const balanceData = await ledgerModel.aggregate([
//         { $match : {account : this._id}},
//         {
//             $group : {
//                 _id : null, 
//                 totalDebit : {
//                     $sum : {
//                         $cond : [
//                             { $seq : [ "$type", "DEBIT" ]},
//                             "$amount",
//                             0
//                         ]
//                     }
//                 },
//                 totalCredit : {
//                     $sum : {
//                         $cond : [
//                             { $seq : [ "$type", "CREDIT" ]},
//                             "$amount",
//                             0
//                         ]
//                     }
//                 }
//             }
//         }, 
//         {
//             $project : {
//                 _id : 0,
//                 balance : {$subtract : [ "$totalCredit", "$totalDebit" ]}
//             }
//         }
//     ])

//     // if the user is new and the user does not have any history of credit or debit then 
//     // the above function will return an empty array 

//     if(balanceData.length === 0) {
//         return 0;
//     }

//     return balanceData[0].balance
// }



// gpt code
accountSchema.methods.getBalance = async function(){

    const balanceData = await ledgerModel.aggregate([
        { 
            $match : { account : this._id } 
        },
        {
            $group : {
                _id : null,

                totalDebit : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$type", "DEBIT" ] },
                            "$amount",
                            0
                        ]
                    }
                },

                totalCredit : {
                    $sum : {
                        $cond : [
                            { $eq : [ "$type", "CREDIT" ] },
                            "$amount",
                            0
                        ]
                    }
                }
            }
        },

        {
            $project : {
                _id : 0,
                balance : { $subtract : [ "$totalCredit", "$totalDebit" ] }
            }
        }
    ])

    return balanceData.length ? balanceData[0].balance : 0
}

























const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel



