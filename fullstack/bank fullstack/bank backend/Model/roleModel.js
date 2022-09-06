const mongoose = require("mongoose")


const RoleSchema = mongoose.Schema({
    id: { type: String , required:true},
    role: { type: String , unique:true,required:true},
}, {
    timestamps: true
})

let RoleModel = new mongoose.model('roles', RoleSchema)

module.exports = RoleModel