let mongoose = require('mongoose');
const UserModel = require("../Model/userModel");
const CredentialModel = require("../Model/crendentialModel");
const RoleModel = require("../Model/roleModel");
const AccountModel = require('../Model/accountModel');
const TransactionModel = require('../Model/transaction');

const url = "mongodb://localhost:27017/bank"

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

    static hadleError = (err) => {
        if (err.name === 'ValidationError') {
            let field = Object.keys(err.errors)[0]
            console.log(`${field} is required`)
            return [null, `${field} is required`];
        }

        if (err.code && err.code == 11000) {
            let field = Object.keys(err.keyValue)
            console.log( `${field} already exist,try new one`)
            return [null, `${field} already exist,try new one`]
        }

        else {
            return [null, `unknown error in database `]
        }
    }

    //credential
    async insertCredential(credential) {
        try {
            let newRecord = await CredentialModel.create(credential)
            return [newRecord,"credential created successfully"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }

    }

    async fetchCredential(username) {
        try {
            let record = await CredentialModel.findOne({ username: username })
            return [record,"credentils fetched"] 
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchAllCredential() {
        try {
            let record = await CredentialModel.find()
            return [record,"credentils fetched"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchUsernames(username) {
        try {
            console.log(username)
            let record = await CredentialModel.find({},{username:1,_id:0})
            return [record,"user fetched"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    
    }

    //user
    async insertUser(user) {
        try {
            let newRecord = await UserModel.create(user)
            return [newRecord,"user created successfully"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchUser(credential) {
        try {
            let record = await UserModel.findOne({ credential: credential }).populate(
                "credential").populate({
                    path: 'account',
                    model: 'account',
                    populate: {
                        path: 'transactions',
                        model: 'transactions',
                    }
                })
            return [record,"user fetched"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    
    }

   

    async fetchAllUsers() {
        try {
            let record = await UserModel.find().populate(
                "credential").populate({
                    path: 'contacts',
                    model: 'contacts',
                    populate: {
                        path: 'contactDetails',
                        model: 'contactDetails',
                    }
                })
            return [record,"user fetched"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchAllWitheRole(role) {
        try {
            let record = await UserModel.find({ role: role }).populate(
                "credential").populate({
                    path: 'contacts',
                    model: 'contacts',
                    populate: {
                        path: 'contactDetails',
                        model: 'contactDetails',
                    }
                })
            return [record,`user with ${role} role fetched`]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    
    }

    async replaceUser(userObject) {
        // warning : not to be used to change credential

        try {
            let record = await UserModel.updateOne({ credential: userObject.credential }, userObject)
            if (record.modifiedCount == 1) {
                return [record, "user updated successfully"]
            }

            if (record.modifiedCount == 0) {
                return [record, "user updated successfully"]
            }

            if (record.modifiedCount > 1) {
                return [record, "many users updated successfully"]
            }
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        } 
    }

    //Accont
    async insertAccount(account) {
        try {
            let newRecord = await AccountModel.create(account)
            return [newRecord, "account created successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchAccount(account_no) {
        try {
            let newRecord = await AccountModel.findOne({account_no:account_no}).populate("transactions")
            return [newRecord, "account fetched successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async replaceAccount(account) {
        try {
            let record = await AccountModel.updateOne({ account_no: account.account_no }, account)
            return [record, "account updated successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async creditAccount(account,amount) {
        try {
            let record = await AccountModel.updateOne({ account_no: account.account_no }, {$inc: {"balance": amount}})
            return [record, "account updated successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async debitAccount(account,amount) {
        try {
            let record = await AccountModel.updateOne({ account_no: account.account_no },  {$inc: {"balance": -amount}})
            return [record, "account updated successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async pushTransaction(account,id) {
        try {
            let record = await AccountModel.updateOne({ account_no: account.account_no },  {$push: {"transactions": id}})
            return [record, "account updated successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }


    //Transaction
    async insertTransaction(transaction) {
        
        try {
            let newRecord = await TransactionModel.create(transaction)
            return [newRecord, "transaction added successfully"]
        }
        catch (err) {
            console.log(err)
            return DatabaseMongoose.hadleError(err)
        }
    }
    //roles
    async insertRole(roleObject){
        try {
            let newRecord = await RoleModel.create(roleObject)
            return [newRecord, "role added successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }
    async fetchAllRoles() {
        try {
            let record = await RoleModel.find()
            return [record,"roles fetched"]
        }

        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }
}


module.exports = DatabaseMongoose 