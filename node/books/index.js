const Book = require("./Views/book")
const Credential = require("./Views/credential")
const User = require("./Views/user")
const DatabaseMongoose = require('./repository/database')

const Run = async () => {

   
    const venkyCredential =  await Credential.createCredential("new","password") 
    console.log(venkyCredential)

    
    const db = new DatabaseMongoose()
       
    const newUser = await db.replaceCredential("kali")  
    console.log(newUser.modifiedCount)
   
}

Run()