const Contact = require("./contact")
const ContactDetails = require("./contactDetails")


class User {
    static all_users = [];
    static id = 0;
    constructor(firstname, lastname, username, role) {
        this.id = ++User.id
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.role = role
        this.isActive = true
        this.contacts = []
    }
    
    createUser(firstname, lastname, username, role) {
        if (this.isActive==false){
            return [null,"not allowed to createUser"]
        }
        if (this.role != "Admin") { 
            return [null,"only Admin can create a User"]
        }
        
        let [indexOfUser,isUsernameExist] = User.#findUser(username)
        if (isUsernameExist){
            return [null,"username already exist,try new one"]
        }
        const newUser = new User(firstname, lastname, username, role)
        User.all_users.push(newUser)
        return [newUser,"new user created success"]
    }

    static #findUser(username){
        if (this.isActive==false){
            return [-1,false]
        }
        for (let index = 0; index < User.all_users.length; index++) {
            if (username == User.all_users[index].username){
                return [index,true]
            }    
        }
        return [-1,false]
    }

    deleteUser(username){
        
        if (this.isActive==false){
            return [false,"invalid user"]
        }

        if (this.isActive==false){
            return [false,"this account was deleted"]
        }
        if (this.role!="Admin"){
            return [false,"Only admin can delete user"]
        }

        let [indexOfUser,isUserExist] = User.#findUser(username)
        if (!isUserExist){
            return [false,"no user exist that username"]
        }
        if(User.all_users[indexOfUser].isActive==false){
            return [false,"already deleted"]
        }
        User.all_users[indexOfUser].isActive = false
        return [true,"User deleted successfully"]
    }

    updateUser(propertTobeUpdated,value){
        switch(propertTobeUpdated){
            case("firstname"): this.firstname = value ; return [true,this]
            case("lastname"): this.lastname = value ; return [true,this]
            default: return [false,null]

        }
    }

    static findUser(username){
        for (let index = 0; index < User.all_users.length; index++) {
            const User = User.all_users[index];
            return [true,User]  
        }
        return [false,null]
    }


    #findContact(fullname) {
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
        if (this.isActive==false){
            return "invalid user"
        }
        let [indexOfContact,isContactExist] = this.#findContact(`${firstname} ${lastname}`)

        if (isContactExist){
            return "choose different name,that name alredy exist"            
        }
        const newContact = new Contact(firstname, lastname)
        this.contacts.push(newContact)
        return newContact
    }

    createContactDetails(fullname, type, value) {
        if (this.isActive==false){
            return "invalid user"
        }

        let [indexOfContact, isContactExist] = this.#findContact(fullname)
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
        let [indexOfContact, isContactExist] = this.#findContact(fullname)
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

    deleteContact(username){
        if (this.isActive==false){
            return "invalid user"
        }
        let [indexOfContact, isContactExist] = this.#findContact(username)
        if (!isContactExist) {
            return [false, null, "no found contact with that id"]
        }
        let isdeleted = this.contacts[indexOfContact].deleteContact()

        if(isdeleted){
            return [true, this.contacts[indexOfContact], "contact deleted successfully"]
        }
        return[false,null,"that contact was already deleted"]
    }
}


module.exports = User
