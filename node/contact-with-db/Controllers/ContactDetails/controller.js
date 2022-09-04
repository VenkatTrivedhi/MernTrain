const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const  createContactDetails = async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["type","value"],["username","contactName"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfUser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const contactName = req.params.contactName
    const {type,value} = req.body
    const [isCreated,contactDetails,message]= await selfUser.createContactDetails(contactName, type, value)
    if(!isCreated){
        resp.status(500).send({"data":contactDetails,"message":message})
        return message
    }
    resp.status(201).send({"data":contactDetails,"message":message})
    return message
}

const  updateContactDetails = async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username","contactName","type"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfUser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!selfUser){
        return "unauthorized access"
    }
    const {username,contactName,type} = req.params
    const {propertyTobeUpdated,value} = req.body
    const [isUpdated,contactDetails,message]= await selfUser.updateContactDetails(contactName, type, propertyTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send({"data":contactDetails,"message":message})
        return message
    }
    resp.status(200).send({"data":contactDetails,"message":message})
    return message
}

const  deleteContactDetails = async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,[],["username","contactName","type"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfUser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,contactName,type} = req.params

    const [isDeleted,contactDetails,message]= await selfUser.deleteContactDetails(contactName, type)
    if(!isDeleted){
        resp.status(500).send({"data":contactDetails,"message":message})
        return message
    }
    resp.status(200).send({"data":contactDetails,"message":message})
    return message
}

module.exports = {createContactDetails,updateContactDetails,deleteContactDetails}