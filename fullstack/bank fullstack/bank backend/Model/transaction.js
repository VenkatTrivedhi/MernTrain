const mongoose = require("mongoose")


const TransactionSchema = mongoose.Schema({
    id: { type: String , required:true},
    amount : { type: Number , required:true},
    type : { type: String , required:true},
    effect : { type: String , required:true},
    isSuccess : { type: Boolean , required:true},
    doneAt : {type: Date,required:true},
    balanceAfterTransaction : {type:Number,required:true},
    counterCustomer : { type:Object,required:false},
}, {
    timestamps: true
})

let TransactionModel = new mongoose.model('transactions', TransactionSchema)

module.exports = TransactionModel