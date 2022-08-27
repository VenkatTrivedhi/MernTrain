const Credential = require("./credential")
const DatabaseMongoose = require("../repository/database")


class User{
    constructor(name,age,credential){
        this.name = name
        this.age = age
        this.credential = credential
        this.books = [] 
      }

    
      static async createUser(name,age,username,password){
        const db = new DatabaseMongoose()
        const gotenCredential = await Credential.getCredential(username)
        console.log(gotenCredential)
        
        if(gotenCredential){
            return "username already exist"      
        }
        const newCredential = await Credential.createCredential(username,password)
        const newUser = new User(name,age,newCredential._id)
        const record = await db.insertUser(newUser)
        if(record.name!=newUser.name){
            return "error"
        }
        return record
    }

    static async getUser(username){
        const db = new DatabaseMongoose()
        const gotenCredential = await   Credential.getCredential(username)
        if(!gotenCredential){
            return "invalid credential"
        }
        const gotenUser = await db.getUser(gotenCredential)
        return gotenUser
    }

    static async updateUser(username,propertyToBeUpdated,value){
        const db = new DatabaseMongoose()
        
        const gotenCredential = await   Credential.getCredential(username)
        if(!gotenCredential){
            return "invalid credential"
        }

        switch(propertyToBeUpdated){
            
            case("name"):{
                const record = await db.updateUserFullName(gotenCredential,value)
                return [true,record,"name updated successfully"]
            }

            case("age"):{
                const record = await db.updateUserAge(gotenCredential,value)
                return [true,record,"age updated successfully"]
            }
           
            default: {
                return [true,null,"property cannot be updated"]
            }
        }
    }

    static async deleteUser(username){
        const db = new DatabaseMongoose()

        const gotenCredential = await   Credential.getCredential(username)
        if(!gotenCredential){
            return "invalid credential"
        }
        const deleteCredential=await Credential.deleteCredential(gotenCredential.username)
        const result = await db.deleteUser(gotenCredential)
        return [true,result,"User deleted successfully"]
    }

}

module.exports = User