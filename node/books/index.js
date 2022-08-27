const Book = require("./Views/book")
const Credential = require("./Views/credential")
const User = require("./Views/user")


const Run = async () => {

   
    const venkyCredential =  await Credential.createCredential("venky","password") 
    const fetchedVenky = await Credential.getCredential("venky")
    console.log(fetchedVenky)

    const newUser = await User.updateUser("venkat","name","gani")
    console.log(newUser)

   
}

Run()