let mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const BookModel = require("../Model/Book");
const UserModel = require("../Model/User");
const CredentialModel = require("../Model/Credential");

const url = "mongodb://localhost:27017/test1"

class DatabaseMongoose {
    
    constructor() {
        this._connect()
    }
    
    _connect() {
        mongoose.connect(url)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }

    async insertBook(book) {
        try {
            let newRecord = await BookModel.create(book)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async insertManyBooks(listOfbooks) {
        let newRecords = await BookModel.insertMany(listOfbooks).then(function () {
            console.log("Data inserted")  
        }).catch(function (error) {
            console.log(error)      
                });
        return newRecords
    }

    async getBook(name) {
        let record = await BookModel.where("name").equals(name).limit(5)
        return record 
    }
    
    async updateBookPrice(name,value) {
        let record = await BookModel.update({name:name}, {$set: {price:value}})
        return record
    }

    async deleteBook(name) {
        let record = await BookModel.remove({name:name})
        return record
    }

    async insertCredential(credential) {
        try {
            let newRecord = await CredentialModel.create(credential)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async getCredential(username) {
        let record = await CredentialModel.where("username").equals(username).populate("_id")
        return record 
    }

    async deleteCredential(username) {
        let record = await UserModel.remove({username:username})
        return record
    }

    async insertUser(user) {
        try {
            let newRecord = await UserModel.create(user)
            return newRecord
        }
        catch (e) {
            console.log(e.message)
        }
    }

    async getUser(credential) {
        let record = await UserModel.where("credential").equals(credential).populate("credential")
        return record 
    }

    async updateUserFullName(credential,value) {
        let record = await UserModel.update({credential:credential}, {$set: {name:value}})
        return record
    }

    async updateUserAge(credential,value) {
        let record = await UserModel.update({credential:credential}, {$set: {age:value}})
        return record
    }

    async deleteUser(credential) {
        let record = await UserModel.remove({credential:credential})
        return record
    }

} 


module.exports =  DatabaseMongoose 