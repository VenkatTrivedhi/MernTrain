const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    id: { type: String , required:true},
    fullName : { type: String , required:true}, 
    credential : { type:mongoose.SchemaTypes.ObjectId,ref:"credential",unique:true,required:true},
    role: { type: String },
    isActive: { type: Boolean },
    account : { type: mongoose.SchemaTypes.ObjectId,ref:"account" },
}, {
    timestamps: true
})

let UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel