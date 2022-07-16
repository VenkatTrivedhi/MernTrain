const ContactDetails = require("./contactDetails")


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

    createContactDetails(type,value){
        if(this.isActive==false){
            return [false,null]
        }
        const newcontactDetails = new ContactDetails(type, value)
        this.contactDetails.push(newcontactDetails)
        return [true , newcontactDetails]
    }
}

module.exports = Contact