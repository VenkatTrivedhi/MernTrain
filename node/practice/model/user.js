const uuid = require("uuid")

class User{
    static allUser = []
    constructor(firstname,lastname,age){
        this.firstname = firstname
        this.lastname = lastname
        this.age = age
        this.id = uuid.v4()
    }
}

module.exports = User