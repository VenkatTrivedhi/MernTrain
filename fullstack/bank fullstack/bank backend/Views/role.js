const uuid = require("uuid")
const DatabaseMongoose = require("../respository/database")

class Roles{
    constructor(id,role){
        this.id = id
        this.role=role
    }

    static async addRole(role){
        const db = new DatabaseMongoose()
        const id = uuid.v4()
        const newRole = new Roles(id,role)
        const [newRoleRecord,message] =await db.insertRole(newRole)
        if(!newRoleRecord){
            return [null,message]
        }
        return [newRoleRecord,message]
    }

    static async getAllRoles(role){
        const db = new DatabaseMongoose()
        const [newRoleRecord,message] =await db.fetchAllRoles()
        if(!newRoleRecord){
            return [null,message]
        }
        return [newRoleRecord,message]
    }
}

Roles.addRole("User")
Roles.addRole("Admin")

module.exports = Roles