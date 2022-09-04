const ContactDetails = require("./contactDetails")
const uuid = require("uuid")
const DatabaseMongoose = require("../repository/database")


class Contact {
    constructor(id,firstname, lastname , isActive , contactDetails) {
        this.id = id
        this.firstName = firstname
        this.lastName = lastname
        this.fullName = firstname + " " + lastname
        this.isActive = isActive
        this.contactDetails = contactDetails
    }
    static db = new DatabaseMongoose()

    static async createContact(firstName,lastName ){
        const id = uuid.v4()
        const newContactObject = new Contact(id,firstName,lastName,true,[])
        const [newContactRecord,messageOfContactCreation] = await Contact.db.insertContact(newContactObject) // change
        if(!newContactRecord){
            return [null,messageOfContactCreation]
        }
        if(newContactRecord.fullName!=newContactObject.fullName){
            return [null,"errror while saving contact"]
        }
        return [newContactObject,"contact created successfully"]
    }

    static  reCreateContactObejct(contactRecord){
        const newContactObject = new Contact(contactRecord.id, contactRecord.firstName,contactRecord.lastName,contactRecord.isActive,contactRecord.contactDetails)
        return newContactObject
    }

    async isContactExist(fullname) {
        if (this.isActive == false) {
            return false
        }
        return this.fullName == fullname
    }

    async delete() {
        if (this.isActive == false) {
            return [false, "invalid Contact"]
        }
        this.isActive = false
        const [result,messageOfResult] = await Contact.db.replaceContact(this)
        if(!result){
            return[false,messageOfResult]
        }
        if(result.modifiedContact==0){
            return[false,messageOfResult]
        }
        return [true, "Contact deleted successfully"]
    }

    async update(propertyTobeUpdated, value) {
        if (this.isActive == false) {
            return [false, this, "invalid contact"]
        }
        switch (propertyTobeUpdated) {
            case ("firstName"): {
                this.firstName = value;

                this.#autoUpdateFullname();
                const [updateRecord,message] = await Contact.db.replaceContact(this)
                if(!updateRecord){
                    return[false,this,message]
                }
                if(updateRecord.modifiedContact==0){
                    return[false,this,message]
                }
                return [true, this, "firstname updated successfully"];
            }
            case ("lastName"): {
                this.lastName = value;
                this.#autoUpdateFullname();
                const updateRecord = await Contact.db.replaceContact(this)
                if(!updateRecord){
                    return[false,this,message]
                }
                if(updateRecord.modifiedContact==0){
                    return[false,this,message]
                }
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
            return null
        }
        if (this.contactDetails.length == 0) {
            return null
        }
        for (let index = 0; index < this.contactDetails.length; index++) {
            if (this.contactDetails[index].type == type) {
                const contactDeatailsObject = ContactDetails.reCreateContactDetails(this.contactDetails[index])  
                return contactDeatailsObject
            }
        }
        return null
    }

    findActiveContactDetails(type) {
        if (this.isActive == false) {
            return null
        }
        if (this.contactDetails.length == 0) {
            return null
        }
        for (let index = 0; index < this.contactDetails.length; index++) {
            if (this.contactDetails[index].type == type && this.contactDetails[index].isActive) {
                const contactDeatailsObject =  ContactDetails.reCreateContactDetails(this.contactDetails[index])  
                return contactDeatailsObject
            }
        }
        return null
    }

    async createContactDetails(type, value) {
        if (this.isActive == false) {
            return [false, null,"this contact is deactivated"]
        }
        const contactDeatailsObject = this.findContactDetails(type)

        if(contactDeatailsObject==null){
            const [newcontactDetailsObject,msgOfCreateDetail]= await ContactDetails.createContactDetails(type, value)
            const [newContactDetailsRecord,msgOfFetchDetail] =
                await Contact.db.fetchContactDetails(newcontactDetailsObject.id) 
            this.contactDetails.push(newContactDetailsRecord._id)
            const [replaceContactResult,message]= await Contact.db.replaceContact(this)
            if(!replaceContactResult){
                return[false,this,message]
            }
            if(replaceContactResult.modifiedContact==0){
                return[false,this,message]
            }

            return [true, newcontactDetailsObject,msgOfCreateDetail]
        }
        
        if(!contactDeatailsObject.isActive){
            contactDeatailsObject.isActive=true
            const [contactDeatailsReplaceResult,message] =await Contact.db.replaceContactDetails(contactDeatailsObject)
            if(!contactDeatailsReplaceResult){
                return[false,this,message]
            }
            if(contactDeatailsReplaceResult.modifiedContact==0){
                return[false,this,message]
            }
            return [true, contactDeatailsObject,"contact reactivated successfully"]   
        }    
        return [false,null,"this contact details with this type already exist"]
    }

    async updateContactDetails(type,propertyTobeUpdated,value){
        const contactDeatailsObject = this.findActiveContactDetails(type)
        if(contactDeatailsObject == null){
            return [false,null,"no such contact details exist"]
        }

        const [isUpdated,updatedContactDetailsObject] = await contactDeatailsObject.update(propertyTobeUpdated,value)
        if(!isUpdated){
            return [false,contactDeatailsObject,"cannnot be updated"]
        }
        return [true,updatedContactDetailsObject,"contact details updated successfully"]
    }

    async deleteContactDetails(type){
        const contactDeatailsObject = this.findActiveContactDetails(type)
        if(contactDeatailsObject==null){
            return [false,null,"no such contact details exist"]
        }
        const isDeleted = await contactDeatailsObject.delete()
        if(!isDeleted){
            return [false,contactDeatailsObject,"cannnot be deleted"]
        }
        return [true,contactDeatailsObject,"contact details deleted successfully"]
    }

}

module.exports = Contact