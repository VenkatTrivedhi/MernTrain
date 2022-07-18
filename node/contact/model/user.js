const Contact = require("./contact")
const Credential = require("./credential")
const ContactDetails = require("./contactDetails")
const uuid = require("uuid")


class User {
    static allUsers = [];
    constructor(id,firstname, lastname,credential,role) {
        this.id = id
        this.firstName = firstname
        this.lastName = lastname
        this.credential = credential
        this.role = role
        this.isActive = true
        this.contacts = []
    }
    static createAdmin(firstname, lastname, username,password){
        const id = uuid.v4()

        let [indexOfUser,isUsernameExist] = User.findUser(username)
        if (isUsernameExist){
            return [null,"username already exist,try new one"]
        }

        const newCredential = new Credential(username,password)
        const newUser = new User(id,firstname, lastname,newCredential, "Admin")
        User.allUsers.push(newUser)
        return [newUser,"new user created success"]
    }

    static findUser(username){
        for (let index = 0; index < User.allUsers.length; index++) {
            let currentUser = User.allUsers[index]
            if (username == currentUser.credential.username && currentUser.isActive){
                return [index,true]
            }    
        }
        return [-1,false]
    }

    createUser(firstname, lastname, username, password,role) {
        let [indexOfUser,isUsernameExist] = User.findUser(username)
        if (isUsernameExist){
            return [null,"username already exist,try new one"]
        }
        const id = uuid.v4()
        const newCredential = new Credential(username,password)
        const newUser = new User(id,firstname, lastname,newCredential,role )
        User.allUsers.push(newUser)
        return [newUser,"new user created success"]
    }

    deleteUser(){
        this.isActive = false
    }

    updateUser(propertTobeUpdated,value){
        switch(propertTobeUpdated){
            case("firstName"): this.firstName = value ; return [true,this]
            case("lastName"): this.lastName = value ; return [true,this]
            default: return [false,null]
        }
    }

    findContact(fullname) {
        if (this.isActive==false){
            return "invalid user"
        }

        if (this.contacts.length == 0) {
            return [-1, false]
        }
      
        for (let index = 0; index < this.contacts.length; index++) {
          
            if (this.contacts[index].isContactExist(fullname)) {
                return [index, true]
            }
        }
        return [-1, false]    
    }

    createContact(firstname, lastname) {
        let [indexOfContact,isContactExist] = this.findContact(`${firstname} ${lastname}`)

        if (isContactExist){
            return "choose different name,that name alredy exist"            
        }
        const newContact = new Contact(firstname, lastname)
        this.contacts.push(newContact)
        return newContact
    }

    getContacts(){
        return this.contacts
    }

    deleteContact(fullname){
        if (this.isActive==false){
            return [false,"Invalid User"]
        }
        let [indexOfContact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false,"No contact found with the name"]
        }
        return this.contacts[indexOfContact].delete()
      
    }

    updateContact(fullName,propertTobeUpdated,value){
        if (this.isActive==false){
            return [false,null,"Invalid User"]
        }
        const [indexOfContact,isContactExist] = this.findContact(fullName)
        if(!isContactExist){
            return [false,null,"contact doesn't exist with that name"]
        }
        return this.contacts[indexOfContact].update(propertTobeUpdated,value)
    }

    createContactDetails(fullname, type, value) {
        if (this.isActive==false){
            return "invalid user"
        }

        let [indexOfContact, isContactExist] = this.findContact(fullname)
        console.log(indexOfContact)

        if (!isContactExist) {
            return [false, null, "no found contact with that id"]
        }

        const {isSuccess,newcontactDetails} = this.contacts[indexOfContact].createContactDetails(type,value)
        if(!isSuccess){
            [false,null,"this contact was deleted"]
        }
        return [true, newcontactDetails, "contact details created successfully"]
    }

    displayContact(fullname) {
        if (this.isActive==false){
           return "invalid user"
        }
        let [indexOfContact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false, null, "no found contact with that id"]
        }
        console.log("displaying", this.contacts[indexOfContact])
    }

    displayContacts() {
        if (this.isActive==false){
            return "invalid user"
        }
        for (let index = 0; index < this.contacts.length; index++) {
            this.displayContact(`${this.contacts[index].firstname} ${this.contacts[index].lastname}`)
        }
    }

}


module.exports = User
