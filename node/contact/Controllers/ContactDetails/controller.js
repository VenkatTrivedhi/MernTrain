const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const  createContactDetails = (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["type","value"],["username","contactName"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const contactName = req.params.contactName
    const {type,value} = req.body
    const [isCreated,contactDetails,message]= User.allUsers[indexOfSelfUser].createContactDetails(contactName, type, value)
    if(!isCreated){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(contactDetails)
    return message
}

const  updateContactDetails = (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username","contactName","type"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,contactName,type} = req.params
    const {propertyTobeUpdated,value} = req.body
    const [isUpdated,contactDetails,message]= User.allUsers[indexOfSelfUser].updateContactDetails(contactName, type, propertyTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(contactDetails)
    return message
}
const  deleteContactDetails = (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,[],["username","contactName","type"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,contactName,type} = req.params

    const [isDeleted,contactDetails,message]= User.allUsers[indexOfSelfUser].deleteContactDetails(contactName, type)
    if(!isDeleted){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(contactDetails)
    return message
}

module.exports = {createContactDetails,updateContactDetails,deleteContactDetails}