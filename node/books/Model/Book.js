const mongoose = require("mongoose")
const database = require("../repository/database")


const BookSchema = mongoose.Schema({
    name: { type: String , required:true  },
    price: { type: Number , required :true }
}, {
    timestamps: true
})

let BookModel = new mongoose.model('books', BookSchema)

module.exports = BookModel