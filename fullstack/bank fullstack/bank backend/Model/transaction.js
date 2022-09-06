const mongoose = require("mongoose")


const TransactionSchema = mongoose.Schema({
    id: { type: String , required:true},
    type : { type: String , required:true}, 
    effect : { type: String , required:true}, 
    amount : { type: Number , required:true}, 
}, {
    timestamps: true
})

let TransactionModel = new mongoose.model('transactions', TransactionSchema)

module.exports = TransactionModel