const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")

const  createContactDetails = (req,resp)=>{
    
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {firstname,lastname,type,value} = req.body
    console.log(firstname,lastname,type,value)
    const [isCreated,contactDetails,message]= User.allUsers[indexOfSelfUser].createContactDetails(`${firstname} ${lastname}`, type, value)
    if(!isCreated){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(contactDetails)
    return message
}

module.exports = createContactDetails