const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    id: { type: Number , required:true},
    firstName : { type: String , required:true}, 
    lastName : { type: String , required:true}, 
    credential : { type:mongoose.SchemaTypes.ObjectId,ref:"credentials",unique:+true,required:true},
    role: { type: String },
    isActive: { type: Boolean },
    contacts: { type: [mongoose.SchemaTypes.ObjectId],ref:"contacts" }
}, {
    timestamps: true
})

let UserModel = new mongoose.model('users', UserSchema)

module.exports = UserModel