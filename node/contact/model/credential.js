const uuid = require("uuid")

class Credential{
    constructor(username,password){
        this.id = uuid.v4()
        this.username = username
        this.password = password
    }
}

module.exports = Credential