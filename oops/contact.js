class User {
    static all_users = [];
    static id = 0;
    constructor(firstname, lastname, role) {
        this.id = ++User.id
        this.firstname = firstname
        this.lastname = lastname
        this.role = role
        this.isActive = true
        this.contacts = []
    }

    createUser(firstname, lastname, role) {
        if (this.isActive==false){
            return [null,"not allowed to createUser"]
        }
        if (this.role != "Admin") { 
            return [null,"only Admin can create a User"]
        }
        const newUser = new User(firstname, lastname, role)
        User.all_users.push(newUser)
        return [newUser,"new user created success"]
    }

    #findUser(fullname){
        if (this.isActive==false){
            return "invalid user"
        }
        for (let index = 0; index < User.all_users.length; index++) {
            if (fullname ==`${User.all_users[index].firstname} ${User.all_users[index].lastname}`){
                return [index,true]
            }    
        }
        return [null,false]
    }

    deleteUser(fullname){
        
        if (this.isActive==false){
            return "invalid user"
        }

        if (this.isActive==false){
            return "this account was deleted"
        }
        if (this.role!="Admin"){
            return "Only admin can delete user"
        }

        let [indexOfUser,isUserExist] = this.#findUser(fullname)
        if (!isUserExist){
            return [false,"no user exist that username"]
        }
        if(User.all_users[indexOfUser].isActive==false){
            this
        }
        User.all_users[indexOfUser].isActive = false
        return [true,"User deleted successfully"]
    }

    #findContact(fullname) {
        if (this.isActive==false){
            return "invalid user"
        }

        if (this.contacts.length == 0) {
            return [null, false]
        }
      
        for (let index = 0; index < this.contacts.length; index++) {
          
            if (this.contacts[index].isContactExist(fullname)) {
                return [index, true]
            }
        }
        return [null, false]
    }

    createContact(firstname, lastname) {
        if (this.isActive==false){
            return "invalid user"
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
        if (!isContactExist) {
            return [false, null, "no found contact with that id"]
        }
        let newcontactDetails = new ContactDetails(type, value)
        this.contacts[indexOfContact].contactDetails.push(newcontactDetails)
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
        console.log(this.contacts[indexOfContact].firstname)
    }

    displayContacts() {
        if (this.isActive==false){
            return "invalid user"
        }
        for (let index = 0; index < this.contacts.length; index++) {
            this.displayContact(`${this.contacts[index].firstname} ${this.contacts[index].lastname}`)
        }
    }

    deleteContact(fullname) {
        if (this.isActive==false){
            return "invalid user"
        }
        let [indexOfContact, isContactExist] = this.#findContact(fullname)
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


class Contact {
    static id = 0;
    constructor(firstname, lastname) {
        this.id = ++Contact.id
        this.firstname = firstname
        this.lastname = lastname
        this.isActive = true
        this.contactDetails = []
    }

    isContactExist(fullname) {
        if (this.isActive==false){
            return false
        }
        return `${this.firstname} ${this.lastname}` == fullname
    }

    deleteContact(){
        if (this.isActive==false){
            return false
        }
        this.isActive=false
        return true
    }
}


class ContactDetails {
    static id = 0;
    constructor(type, value) {
        this.id = ++ContactDetails.id
        this.type = type
        this.value = value
    }
}

const Sundar = new User("Sundar","Pichai","Admin")
console.log(Sundar)
const [venkatesh,venkyMessage] = Sundar.createUser("koppisetti","venkatesh","User")
console.log(venkatesh)


console.log(venkatesh.createContact("Ankith","Raj"))
console.log(venkatesh.createContactDetails("Ankith Raj","email","ankith@gmail.com"))
venkatesh.displayContact("Ankith Raj")
venkatesh.displayContacts()

console.log(venkatesh.deleteContact("Ankith Raj"))

const [avisha,Avishamessage] = Sundar.createUser("Avisha","Jain","User")

console.log(venkatesh.deleteUser("Avisha Jain"))
console.log(Sundar.deleteUser("Avisha Jain"))