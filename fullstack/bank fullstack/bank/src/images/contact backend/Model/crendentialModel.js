const mongoose = require("mongoose")
const validator = require("validator")


const CredentialSchema = mongoose.Schema({
    id: { type: String , required:true},
    username: { type: String , unique:true,required:true},
    password : { type: String , required:true}, 
}, {
    timestamps: true
})

let CredentialModel = new mongoose.model('credentials', CredentialSchema)

module.exports = CredentialModel