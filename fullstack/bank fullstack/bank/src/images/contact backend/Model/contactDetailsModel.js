const mongoose = require("mongoose")


const ContactDetailsSchema = mongoose.Schema({
    id: { type: String , required:true},
    type : { type: String ,required:true}, 
    value : { type: String , required:true}, 
    isActive: { type: Boolean,required:true},
}, {
    timestamps: true
})

let ContactDetailsModel = new mongoose.model('contactDetails', ContactDetailsSchema)

module.exports = ContactDetailsModel