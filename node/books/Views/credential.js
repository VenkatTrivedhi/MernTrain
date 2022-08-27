const DatabaseMongoose = require("../repository/database")

class Credential {
    constructor(username, password) {
        this.username = username
        this.password = password
    }

    static async createCredential(username, password) {
        const newCredential = new Credential(username, password)
        const db = new DatabaseMongoose()
        const record = await db.insertCredential(newCredential)
        return record
    }

    static async getCredential(username) {
        const db = new DatabaseMongoose()
        const record = await db.getCredential(username)
        if (record.length == 0) {
            return null
        }
        return record
    }

    static async deleteCredential(username) {
        const db = new DatabaseMongoose()
        const record = await db.deleteCredential(username)
        return record
    }
}

module.exports = Credential