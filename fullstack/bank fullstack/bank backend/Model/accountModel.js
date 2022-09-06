const mongoose = require("mongoose")


const AccountSchema = mongoose.Schema({
    account_no: { type: String , required:true},
    balance : { type: Number , required:true}, 
    isActive: { type: Boolean,required:true },
    transactions: { type: [mongoose.SchemaTypes.ObjectId],ref:"transactions",required:true}
}, {
    timestamps: true
})

let AccountModel = new mongoose.model('account', AccountSchema)

module.exports = AccountModel