const mongoose = require("mongoose")


const CredentialSchema = mongoose.Schema({
    username: { type: Number , unique:true,required:true},
    password : { type: String , required:true}, 
}, {
    timestamps: true
})

let CredentialModel = new mongoose.model('credentials', CredentialSchema)

module.exports = CredentialModel