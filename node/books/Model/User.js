const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name: { type: String , required:true}, 
    age: { type: String },
    credential : { type:mongoose.SchemaTypes.ObjectId,ref:"credentials" },
    books: { type: [mongoose.SchemaTypes.ObjectId],ref:"books" }
}, {
    timestamps: true
})

let UserModel = new mongoose.model('Users', UserSchema)

module.exports = UserModel