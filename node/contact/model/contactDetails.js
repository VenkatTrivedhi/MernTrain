
class ContactDetails {
    static id = 0;2
    constructor(type, value) {
        this.id = ++ContactDetails.id
        this.type = type
        this.value = value
    }
    
}

module.exports = ContactDetails