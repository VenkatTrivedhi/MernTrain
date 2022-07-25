const bcrypt = require("bcrypt")
class Credential{
    constructor(username,password){
        this.username = username
        this.password = password
    }

    isUsernameExists(username){
        return this.username==username
    }

    async getHashedPassword(){
        const Hashed = await bcrypt.hash(this.password,10)
        return Hashed
    }
    async comparePassword(password){
        const isMatch = await bcrypt.compare(password,this.password)
        return isMatch
    }
}

module.exports = Credential