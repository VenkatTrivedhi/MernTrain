const uuid = require("uuid")

class ContactDetails {
 
    constructor(type, value) {
        this.id = uuid.v4()
        this.type = type
        this.value = value
        this.isActive = true
    }

    update(propertTobeUpdated,value){
        switch(propertTobeUpdated){
            case("type"):this.type = value; return [true,this];
            case("value"):this.value = value; return [true,this];
            default:return [false,null]
        }
    }

    delete(){
        this.isActive=false
        return true
    }
    
}

module.exports = ContactDetails