const  mongoose = require("mongoose")

const CredentialSchema = mongoose.Schema({
    username: { type: String, unique : true , required:true },
    password: { type: String, required:true , required:true}
}, {
    timestamps: true
})

let CredentialModel = new mongoose.model('credentials', CredentialSchema)

module.exports = CredentialModel