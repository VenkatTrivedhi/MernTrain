const mongoose = require("mongoose")


const ContactDetailsSchema = mongoose.Schema({
    id: { type: Number , required:true},
    type : { type: String , unique:true,required:true}, 
    value : { type: String , required:true}, 
    isActive: { type: Boolean,required:true},
}, {
    timestamps: true
})

let ContactDetailsModel = new mongoose.model('ContactDetailss', ContactDetailsSchema)

module.exports = ContactDetailsModel