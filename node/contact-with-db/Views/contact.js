const ContactDetails = require("./contactDetails")
const uuid = require("uuid")

class Contact {
    constructor(firstname, lastname) {
        this.id = uuid.v4()
        this.firstName = firstname
        this.lastName = lastname
        this.fullName = firstname + " " + lastname
        this.isActive = true
        this.contactDetails = []
    }

    isContactExist(fullname) {
        if (this.isActive == false) {
            return false
        }
        return this.fullName == fullname
    }

    delete() {
        if (this.isActive == false) {
            return [false, "invalid Contact"]
        }
        this.isActive = false
        return [true, "Contact deleted successfully"]
    }

    update(propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, this, "invalid contact"]
        }
        switch (propertyTobeUpdated) {
            case ("firstName"): {
                if (this.fullName == value + " " + this.lastName) {

                }
                this.firstName = value;
                this.#autoUpdateFullname();
                return [true, this, "firstname updated successfully"];
            }
            case ("lastName"): {
                this.lastName = value;
                this.#autoUpdateFullname();
                return [true, this, "lastname updated"];
            }
            default: return [false, this, "contact not updated "]
        }
    }

    #autoUpdateFullname() {
        this.fullName = this.firstName + " " + this.lastName
    }

    findContactDetails(type) {
        if (this.isActive == false) {
            return -1
        }
        if (this.contactDetails.length == 0) {
            return -1
        }
        for (let index = 0; index < this.contactDetails.length; index++) {
            if (this.contactDetails[index].type == type) {
                return index
            }
        }
        return -1
    }

    findActiveContactDetails(type) {
        if (this.isActive == false) {
            return -1
        }
        if (this.contactDetails.length == 0) {
            return -1
        }
        for (let index = 0; index < this.contactDetails.length; index++) {
            if (this.contactDetails[index].type == type && this.contactDetails[index].isActive) {
                return index
            }
        }
        return -1
    }

    createContactDetails(type, value) {
        if (this.isActive == false) {
            return [false, null]
        }
        const indexOfContactDetails = this.findContactDetails(type)
        if(indexOfContactDetails<0){
            const newcontactDetails = new ContactDetails(type, value)
            this.contactDetails.push(newcontactDetails)
            return [true, newcontactDetails]
        }
        
        if(!this.contactDetails[indexOfContactDetails].isActive){
            this.contactDetails[indexOfContactDetails].isActive=true
            return [true, this.contactDetails[indexOfContactDetails]]   
        }    
        return [false,null]
    }

    updateContactDetails(type,propertyTobeUpdated,value){
        const indexOfContactDeatails = this.findActiveContactDetails(type)
        if(indexOfContactDeatails<0){
            return [false,null,"no such contact details exist"]
        }
        if(propertyTobeUpdated=="type"){
            const indexOfType =this.findContactDetails(value)
            if(indexOfType>=0){
                return [false,this.contactDetails[indexOfContactDeatails],"type already exist"]
            }
        }
        
        const isUpdated = this.contactDetails[indexOfContactDeatails].update(propertyTobeUpdated,value)
        if(!isUpdated){
            return [false,this.contactDetails[indexOfContactDeatails],"cannnot be updated"]
        }
        return [true,this.contactDetails[indexOfContactDeatails],"contact details updated successfully"]
    }

    deleteContactDetails(type){
        const indexOfContactDeatails = this.findActiveContactDetails(type)
        if(indexOfContactDeatails<0){
            return [false,null,"no such contact details exist"]
        }
        const isDeleted = this.contactDetails[indexOfContactDeatails].delete()
        if(!isDeleted){
            return [false,this.contactDetails[indexOfContactDeatails],"cannnot be deleted"]
        }
        return [true,this.contactDetails[indexOfContactDeatails],"contact details deleted successfully"]
    }

}

module.exports = Contact