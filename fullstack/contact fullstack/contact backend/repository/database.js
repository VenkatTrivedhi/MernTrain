let mongoose = require('mongoose');
const UserModel = require("../Model/userModel");
const CredentialModel = require("../Model/crendentialModel");
const ContactModel = require("../Model/contactModel");
const ContactDetailsModel = require("../Model/contactDetailsModel");
const RoleModel = require("../Model/roleModel");

const url = "mongodb://localhost:27017/contactApp"

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
            return [null, `${field} is required`];
        }

        if (err.code && err.code == 11000) {
            let field = Object.keys(err.keyValue)
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

    //contacts
    async insertContact(contact) {
        try {
            let newRecord = await ContactModel.create(contact)
            return [newRecord, "contact created successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchContact(id) {
        //key hook : uuid
        try {
            let record = await ContactModel.findOne({ id: id })
            return [record, "contact fetched"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async replaceContact(contactObject) {
        //key hook : uuid
        try {
            let record = await ContactModel.updateOne({ id: contactObject.id }, contactObject)

            if (record.modifiedCount == 1) {
                return [record, "contact updated successfully"]
            }

            if (record.modifiedCount == 0) {
                return [record, "contact updated successfully"]
            }

            if (record.modifiedCount > 1) {
                return [record, "many contacts updated successfully"]
            }

        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }

    }


    //contactDeatails
    async insertContactDetails(contactDetailsObject) {
        try {
            let newRecord = await ContactDetailsModel.create(contactDetailsObject)
            return [newRecord, "contact details added successfully"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async fetchContactDetails(id) {
        //key hook :uuid
        try {
            let record = await ContactDetailsModel.findOne({ id: id })
            return [record,"details fetched"]
        }
        catch (err) {
            return DatabaseMongoose.hadleError(err)
        }
    }

    async replaceContactDetails(contactDetailsObject) {
        //key hook : uui
        try {
            let record = await ContactDetailsModel.updateOne({ id: contactDetailsObject.id }, contactDetailsObject)
            if (record.modifiedCount == 1) {
                return [record, "details updated successfully"]
            }

            if (record.modifiedCount == 0) {
                return [record, "details updated successfully"]
            }

            if (record.modifiedCount > 1) {
                return [record, "many details updated successfully"]
            }

        }
        catch (err) {
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