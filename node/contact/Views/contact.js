const ContactDetails = require("./contactDetails")
const uuid = require("uuid")

class Contact {
    constructor(firstname, lastname) {
        this.id = uuid.v4()
        this.firstName = firstname
        this.lastName = lastname
        this.fullName = firstname+" "+lastname
        this.isActive = true
        this.contactDetails = []
    }

    isContactExist(fullname) {
        if (this.isActive==false){
            return false
        }
        return this.fullName == fullname
    }

    delete(){
        if (this.isActive==false){
            return [false,"invalid Contact"]
        }
        this.isActive=false
        return [true,"Contact deleted successfully"]
    }

    update(propertTobeUpdated,value){
        if(this.isActive==false){
            return [false,this,"invalid contact"]
        }
        switch(propertTobeUpdated){
            case("firstName"):{
                this.firstName = value;
                this.#autoUpdateFullname();
                return [true,this,"firstname updated successfully"];
            }
            case("lastName"):{
                this.lastName = value;
                this.#autoUpdateFullname();
                return [true,this,"lastname updated"];
            }
            default:return [false,this,"contact not updated "]
            }
        }                 

    #autoUpdateFullname(){
        this.fullName = this.firstName+" "+this.lastName
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