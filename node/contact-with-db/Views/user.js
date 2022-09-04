const Contact = require("./contact")
const Credential = require("./credential")
const ContactDetails = require("./contactDetails")
const uuid = require("uuid")
const DatabaseMongoose = require("../repository/database")
const { Collection } = require("mongoose")
const paginater = require("./paginater")


class User {
    
    constructor(id, firstname, lastname, credential, role , isActive ,contacts) {
        this.id = id
        this.firstName = firstname
        this.lastName = lastname
        this.credential = credential
        this.role = role
        this.isActive = isActive
        this.contacts = contacts
    }
    static db = new DatabaseMongoose()

    static async createSuperUser(firstname, lastname, username, password) {
        const [superuserRecord,messageOfFetch] = await User.db.fetchCredential("admin")
        if (superuserRecord) {
            return [null, "cannot duplicate superuser"]
        }
        const id = uuid.v4()
        const [newCredentialObject,messageOfCredentialCreate] =
            await Credential.createCredential(username, password)
        const [newCredentialRecord,messageOfFetchCredential] = 
            await User.db.fetchCredential(username)
        const newUser = new User(id, firstname, lastname, newCredentialRecord._id, "Admin",true,[])
        const [newUserRecord,messageOfUser ]= await User.db.insertUser(newUser)
        return [newUser, "new user created success"]
    }

    async createUser(firstname, lastname, username, password, role) {

        const [fetchedCredentialRecord,messageOfetchingCredential] =
            await User.db.fetchCredential(username)

         if (!fetchedCredentialRecord) {
            const id = uuid.v4()
            const [newCredentialObject,messageOfCreatingCredential] = 
                await Credential.createCredential(username, password)
            const [newCredentialRecord,messageOfnewCredentialRecord] = 
                await User.db.fetchCredential(username)
            if(!newCredentialRecord){
                return [newCredentialRecord,messageOfCreatingCredential]
            }
            const newUserObject = new User(id, firstname, lastname, 
                newCredentialRecord._id, role,true,[])
            const [newUserRecord,messageOfNewUserRecord] =
                await User.db.insertUser(newUserObject)
            if(!newUserRecord){
                return [newUserRecord,messageOfNewUserRecord]
            }
            const [fetcehdUserRecord,messageOfFetchedUserRecord] = 
                await User.db.fetchUser(newCredentialRecord)
            const newUser = User.reCreateUserObject(fetcehdUserRecord)
            return [newUser, messageOfNewUserRecord]
        }

        const [fetchedUserRecord,messageOfFetchedUserRecord] = await User.db.fetchUser(fetchedCredentialRecord)
        
        if (!fetchedUserRecord.isActive) {
            const userObject = User.reCreateUserObject(fetchedUserRecord)
            userObject.isActive = true
            const [result,messageOfResult] = await User.db.replaceUser(userObject)
            if(!result){
                return [null,messageOfResult]
            }
            if(result.modifiedCount==0){
                return [null,messageOfResult]
            }
            const [userRecord,messageOfUserRecord] = await User.db.fetchUser(fetchedCredentialRecord)            
            const updatedUser = User.reCreateUserObject(userRecord)
            return [updatedUser, messageOfResult]
        }
        return [null, "username already exist,try new one"]
    }

    static  reCreateUserObject(record){       
        const UserObject = new User(record.id,record.firstName,record.lastName,record.credential,record.role,record.isActive,record.contacts)
        return UserObject
    }

    static async  findUser(username) {
        const [fetchedCredentialRecord,messageOfFetchCredential] = await User.db.fetchCredential(username)
        if(!fetchedCredentialRecord){
            return [null,"username already exist,try new one"]
        }
        const [fetchedUserRecord,msgOfUserFetch] = await User.db.fetchUser(fetchedCredentialRecord)
        if(fetchedUserRecord.isActive!=true){
            return [null, "user is not active"]
        }

        
        const userObject = User.reCreateUserObject(fetchedUserRecord)
        return [userObject,"user found"]
    }

    static async findUserInAll(username) {
        const [fetchedCredentialRecord,msgOfCredentialFetch] =
            await User.db.fetchCredential(username)

        if(!fetchedCredentialRecord){
            return [null,"username already exist,try new one"]
        }

        const [fetchedUserRecord,msgOfUserFetch] = User.db.fetchUser(fetchedCredentialRecord)
        const userObject = User.reCreateUserObject(fetchedUserRecord)
        return [userObject,"user found"]
    }  

    async getAllUserObjects(limit,page){
        //can be changed later
        const [allUsersRecord,msgOfallUsersRecord] = 
            await User.db.fetchAllWitheRole("User")
        const currentUsersRecord = paginater(allUsersRecord,limit,page)
        let currentPage = []
        for (let index = 0; index < currentUsersRecord.length; index++) {
            let userObject =  User.reCreateUserObject(currentUsersRecord[index])
            currentPage.push(userObject)
        }
        return [allUsersRecord.length,currentPage] 
    }
   
    async deleteUser() {
        this.isActive = false
        const [result,message] = await User.db.replaceUser(this)
        if(!result){
            return false
        }        
        if(result.modifiedCount==0){
            return false
        }        
        return true
    }

    async updateUser(propertTobeUpdated, value) {
        switch (propertTobeUpdated) {
            case ("firstName"): {
                this.firstName = value; 
                const [result,message] = await User.db.replaceUser(this) ;
                if(!result){
                    return[false,null]
                } 
                if(result.modifiedCount==0){
                    return[false,null]
                } 
                return [true, this]}
            case ("lastName"): {
                this.lastName = value; 
                const [result,message]=await User.db.replaceUser(this);
                if(!result){
                    return[false,null]
                } 
                if(result.modifiedCount==0){
                    return[false,null]
                } 
                return [true, this]
            }
            default: return [false, null]
        }
    }

    static async validateCredential(username, password) {
        const [userObject, message] = await User.findUser(username)
        if (!userObject) {
            return [false, null, "invalid credential"]
        }
        const CredentialObject = Credential.reCreatedCredentialObject(userObject.credential)
        if (await CredentialObject.ComparePasspassword(password)) {
            return [true, userObject , "valid credential"]
        }
        return [false, null , "invalid credential"]
    }


    //contacts
    findContact(fullname) {
        if (this.isActive == false) {
            return [null, false]
        }
        if (this.contacts.length == 0) {
            return [null, false]
        }
        for (let index = 0; index < this.contacts.length; index++) {

            if (this.contacts[index].fullName == fullname && this.contacts[index].isActive ) {
                const contactObject = Contact.reCreateContactObejct(this.contacts[index])
                return [contactObject, true]
            }
        }
        return [null, false]
    }

    findContactInAll(fullname) {
        if (this.isActive == false) {
            return [null, false]
        }
        if (this.contacts.length == 0) {
            return [null, false]
        }
        for (let index = 0; index < this.contacts.length; index++) {
            if (this.contacts[index].fullName == fullname) {
                const contactObject = Contact.reCreateContactObejct(this.contacts[index])
                return [contactObject, true]
            }
        }
        return [null, false]
    }

    async createContact(firstname, lastname){
        const [contact, isContactExist] = this.findContactInAll(`${firstname} ${lastname}`)

        if (!isContactExist) {
            const [newContactObject,messageOfCreateContact]= await Contact.createContact(firstname, lastname)
            const [newContactRecord,messageOfFetchContact]= await User.db.fetchContact(newContactObject.id)
            this.contacts.push(newContactRecord._id)
            await User.db.replaceUser(this)
            return [true, newContactObject, "contact created successfully"]
        }
        if (!contact.isActive) {
            contact.isActive = true
            const [result,messageOfResult] = await User.db.replaceContact(contact)
            if(!result){
                return [false,null,,messageOfResult]
            }
            const [activatedContactRecord, messageOfactivatefetch]= await User.db.fetchContact(contact.id)
            const activatedContactObject = Contact.reCreateContactObejct(activatedContactRecord)
            return [true, activatedContactObject , "contact re-activated"]
        }

        return [false, null, "choose different name,that name already exist"]
    }

    async getAllContactObjects(limit,page){
        //can be changed later
        let contacts =this.contacts.filter(contact=>contact.isActive)
        console.log(contacts)
        const currentContactsRecord = paginater(contacts,limit,page)
        let currentPage = []
        for (let index = 0; index < currentContactsRecord.length; index++) {
            let contactObject = Contact.reCreateContactObejct(currentContactsRecord[index])
            currentPage.push(contactObject)
        }
        return [contacts.length,currentPage] 
    }

    async deleteContact(fullname) {
        if (this.isActive == false) {
            return [false, "Invalid User"]
        }
        let [contact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false, "No contact found with the name"]
        }

        return contact.delete()

    }

    async updateContact(fullName, propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        const [contact, isContactExist] = this.findContact(fullName)
        if (!isContactExist) {
            return [false, null, "contact doesn't exist with that name"]
        }

        return await contact.update(propertyTobeUpdated, value)
    }

    async createContactDetails(fullname, type, value) {
        if (this.isActive == false) {
            return [false, null, "invalid user"]
        }

        let [contact, isContactExist] = this.findContact(fullname)

        if (!isContactExist) {
            return [false, null, "no contact found with that id"]
        }

        return await contact.createContactDetails(type, value)
        
    }

    async deleteContactDetails(fullname, type) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        const [contact, isContactExist] = this.findContact(fullname)
        if (!isContactExist){ 
            return [false, null, "No contact found with the name"]
        }
        return await contact.deleteContactDetails(type)
    }

    async updateContactDetails(fullName, type, propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        const [contact, isContactExist] = this.findContact(fullName)
        if (!isContactExist) {
            return [false, null, "contact doesn't exist with that name"]
        }
        return await contact.updateContactDetails(type, propertyTobeUpdated, value)
    }


}

User.createSuperUser("super", "user", "admin", "admin@123")
module.exports = User
