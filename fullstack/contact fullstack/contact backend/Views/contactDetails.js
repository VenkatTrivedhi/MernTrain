const uuid = require("uuid");
const ContactDetailsModel = require("../Model/contactDetailsModel");
const DatabaseMongoose = require("../repository/database")

class ContactDetails {

    static db = new DatabaseMongoose();

    constructor(id, type, value, isActive) {
        this.id = id
        this.type = type
        this.value = value
        this.isActive = isActive
    }

    static async createContactDetails(type, value) {
        const id = uuid.v4()
        const newContactDetailsObject = new ContactDetails(id, type, value, true)
        const [newContactDetailsRecord,message] = await ContactDetails.db.insertContactDetails(newContactDetailsObject)
        if(!newContactDetailsRecord){
            return [null,message]
        }
        if (newContactDetailsObject.type != newContactDetailsRecord.type) {
            return [null,message]
        }
        return [newContactDetailsObject,message]
    }   

    static reCreateContactDetails(contactDetailsRecord) {
        const recreatedContactDetailsObject = new ContactDetails(
            contactDetailsRecord.id,
            contactDetailsRecord.type,
            contactDetailsRecord.value,
            contactDetailsRecord.isActive)

        return recreatedContactDetailsObject
    }

    async update(propertTobeUpdated, value) {
        switch (propertTobeUpdated) {
            case ("value"): {
                this.value = value;
                const[replacementResult,message] = await ContactDetails.db.replaceContactDetails(this);
                if(!replacementResult){
                    return[false,this,message]
                }
                if(replacementResult.modifiedContact==0){
                    return[false,this,message]
                }
                return [true, this];
            }
            default: return [false, null]
        }
    }

    async delete() {
        this.isActive = false;
        const replacementResult = await ContactDetails.db.replaceContactDetails(this)
        if(!replacementResult){
            return false
        }
        if(replacementResult.modifiedContact==0){
            return false
        }
        return true
    }

}

module.exports = ContactDetails