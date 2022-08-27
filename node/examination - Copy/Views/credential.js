const uuid = require("uuid")
const bcrypt = require("bcrypt")
class Credential {
    constructor(username, password) {
        this.id = uuid.v4()
        this.username = username
        this.password = password
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