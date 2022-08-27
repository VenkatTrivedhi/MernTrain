const Contact = require("./contact")
const Credential = require("./credential")
const ContactDetails = require("./contactDetails")
const uuid = require("uuid")


class User {
    static #superUser = null;
    static allUsers =[];

    constructor(id, firstname, lastname, credential, role , isActive ,contacts) {
        this.id = id
        this.firstName = firstname
        this.lastName = lastname
        this.credential = credential
        this.role = role
        this.isActive = true
        this.contacts = []
    }

    static async createSuperUser(firstname, lastname, username, password) {
        if (User.#superUser != null) {
            return
        }
        const id = uuid.v4()
        const newCredential = new Credential(username, password)
        await newCredential.getPasswordHashed()
        const newUser = new User(id, firstname, lastname, newCredential, "Admin")
        User.#superUser = newUser
        User.allUsers.push(newUser)
        return [newUser, "new user created success"]
    }


    async createUser(firstname, lastname, username, password, role) {

        const [indexOfUser, isUserExist ] = User.findUser(username)

        if (!isUserExist) {
            const id = uuid.v4()
            const newCredential = new Credential(username, password)
            await newCredential.getPasswordHashed()
            const newUserObject = new User(id, firstname, lastname, newCredential, role)
            User.allUsers.push(newUserObject)            
            return [newUserObject, "new user created successfully"]
        }

        if (!User.allUsers[indexOfUser].isActive) {
            User.allUsers[indexOfUser].isActive = true
            return [User.allUsers[indexOfUser], "user re-activated"]
        }

        return [null, "username already exist,try new one"]
    }


    static findUser(username) {
        for (let index = 0; index < User.allUsers.length; index++) {
            let currentUser = User.allUsers[index]
            if (username == currentUser.credential.username && currentUser.isActive) {
                return [index, true]
            }
        }
        return [-1, false]
    }

    static findUserInAll(username) {
        for (let index = 0; index < User.allUsers.length; index++) {
            let currentUser = User.allUsers[index]
            if (username == currentUser.credential.username) {
                return [index, true]
            }
        }
        return [-1, false]
    }

    static async validateCredential(username, password) {
        let [indexOfUser, isUsernameExist] = User.findUser(username)
        if (!isUsernameExist) {
            return [false, -1, "invalid credential"]
        }
        if (await User.allUsers[indexOfUser].credential.ComparePasspassword(password)) {
            return [true, indexOfUser, "valid credential"]
        }
        return [false, -1, "invalid credential"]
    }
   
    deleteUser() {
        this.isActive = false
        return true
    }

    updateUser(propertTobeUpdated, value) {
        switch (propertTobeUpdated) {
            case ("firstName"): this.firstName = value; return [true, this]
            case ("lastName"): this.lastName = value; return [true, this]
            default: return [false, null]
        }
    }


    

    isBreakingUniquefullname(propertyTobeUpdated, value, contact) {
        switch (propertyTobeUpdated) {
            case ("firstName"): {
                const [indexOfContact, isContactExist] = this.findContact(`${value} ${contact.lastName}`)
                return isContactExist
            }
            case ("lastName"): {
                const [indexOfContact, isContactExist] = this.findContact(`${contact.lastName} ${value}`)
                return isContactExist
            }
            default: return false
        }
    }

    findContact(fullname) {
        if (this.isActive == false) {
            return [-1, false]
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

    findContactInAll(fullname) {
        if (this.isActive == false) {
            return [-1, false]
        }
        if (this.contacts.length == 0) {
            return [-1, false]
        }
        for (let index = 0; index < this.contacts.length; index++) {

            if (this.contacts[index].fullName == fullname) {
                return [index, true]
            }
        }
        return [-1, false]
    }

    createContact(firstname, lastname) {
        let [indexOfContact, isContactExist] = this.findContactInAll(`${firstname} ${lastname}`)

        if (!isContactExist) {
            const newContact = new Contact(firstname, lastname)
            this.contacts.push(newContact)
            return [true, newContact, "contact created successfully"]
        }
        if (!this.contacts[indexOfContact].isActive) {
            this.contacts[indexOfContact].isActive = true
            return [true, this.contacts[indexOfContact], "contact re-activated"]
        }

        return [false, null, "choose different name,that name already exist"]
    }

    getContacts() {
        return this.contacts
    }

    deleteContact(fullname) {
        if (this.isActive == false) {
            return [false, "Invalid User"]
        }
        let [indexOfContact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false, "No contact found with the name"]
        }
        return this.contacts[indexOfContact].delete()

    }

    updateContact(fullName, propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        const [indexOfContact, isContactExist] = this.findContactInAll(fullName)
        if (!isContactExist) {
            return [false, null, "contact doesn't exist with that name"]
        }
        const contactTobeUpdated = this.contacts[indexOfContact]
        const isBreakingUniquefullname = this.isBreakingUniquefullname(propertyTobeUpdated, value, contactTobeUpdated)
        if (isBreakingUniquefullname) {
            return [false, null, "updation is not possible as value breaking uniqueness of fullname"]
        }
        return contactTobeUpdated.update(propertyTobeUpdated, value)
    }

    createContactDetails(fullname, type, value) {
        if (this.isActive == false) {
            return [false, null, "invalid user"]
        }

        let [indexOfContact, isContactExist] = this.findContact(fullname)

        if (!isContactExist) {
            return [false, null, "no contact found with that id"]
        }

        const [isSuccess, newcontactDetails] = this.contacts[indexOfContact].createContactDetails(type, value)
        if (!isSuccess) {
            return [false, null, "this contact was deleted"]
        }
        return [true, newcontactDetails, "contact details created successfully"]
    }

    deleteContactDetails(fullname, type) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        let [indexOfContact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false, null, "No contact found with the name"]
        }
        return this.contacts[indexOfContact].deleteContactDetails(type)

    }

    updateContactDetails(fullName, type, propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, null, "Invalid User"]
        }
        const [indexOfContact, isContactExist] = this.findContactInAll(fullName)
        if (!isContactExist) {
            return [false, null, "contact doesn't exist with that name"]
        }
        return this.contacts[indexOfContact].updateContactDetails(type, propertyTobeUpdated, value)
    }

    displayContact(fullname) {
        if (this.isActive == false) {
            return "invalid user"
        }
        let [indexOfContact, isContactExist] = this.findContact(fullname)
        if (!isContactExist) {
            return [false, null, "no found contact with that id"]
        }
        console.log("displaying", this.contacts[indexOfContact])
    }

    displayContacts() {
        if (this.isActive == false) {
            return "invalid user"
        }
        for (let index = 0; index < this.contacts.length; index++) {
            this.displayContact(`${this.contacts[index].firstName} ${this.contacts[index].lastName}`)
        }
    }
}

User.createSuperUser("super", "user", "admin", "admin@123")
module.exports = User
