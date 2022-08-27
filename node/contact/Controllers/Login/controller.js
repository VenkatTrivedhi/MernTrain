const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const login= async (req,resp) => {
    const missingInput = checkForRequiredInputs(req,["username","password"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return
    }

    const username = req.body.username
    const password = req.body.password
    const [isValid,indexOfUser,message] = await User.validateCredential(username,password)
    if(!isValid){
        resp.status(401).send(message)
        return
    }
    const newPayload = new JwtPayload(User.allUsers[indexOfUser])
    const newToken =  newPayload.createtoken()
    resp.cookie("mytoken",newToken)
    resp.status(200).send(newPayload)
}

const loggedInUser= (req,resp) => {
    const  [isLoggedInUser,Payload,indexOfUser] = JwtPayload.loggedInUser(req,resp)
    if(!isLoggedInUser){
        resp.status(200).send(null)
    }
    resp.status(200).send(Payload)
}

module.exports = {login,loggedInUser}