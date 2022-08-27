const uuid = require("uuid")
const bcrypt = require("bcrypt")
const DatabaseMongoose = require("../repository/database")


class Credential {
    constructor(username, password) {
        this.
        this.username = username
        this.password = password
    }

    static async createCredential(username,password){
        const db = new DatabaseMongoose()
        id = uuid.v4()
        newCredentialObject=new Credential(id,username,password)
        db.insertCredential(newCredentialObject)
        return newCredentialObject
    }

    static async reCreatedCredentialObject(record){
        id = record.id
        username = record.username
        password =  record.password
        reCreatedCredentialObject=new Credential(id,username,password)
        return reCreatedCredentialObject
    }
    static async getCrendentil(){
        
    }

    async getPasswordHashed() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async ComparePasspassword(password) {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    }
}

module.exports = Credential