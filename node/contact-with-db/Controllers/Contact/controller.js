const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")
const paginater = require("../../Views/paginater")

const createContact = async (req,resp)=>{
    const {firstname,lastname} = req.body
    const missingInput = checkForRequiredInputs(req,["firstname","lastname"],["username"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfuser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfuser){
        return "unauthorized access"
    }

    const [isContactCreated,newContact,message] = await selfUser.createContact(firstname,lastname)
    if(!isContactCreated){
        resp.status(500).send({"data":newContact,"message":message})
        return message
    }
    resp.status(201).send({"data":newContact,"message":message})
    return message
}

const getAllContacts = async (req,resp) => {
    console.log("controller hitted")
    const missingInput = checkForRequiredInputs(req,requiredBodyInput=[] ,requiredParamsInput=["username"])
    if(missingInput){
   
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }
    const [isSelfuser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfuser){
        return "unauthorized access"
    }
    const {limit,page} =  req.query
    const [length,currentPage] = await selfUser.getAllContactObjects(limit,page)
    resp.status(200).send({"length":length,"data":currentPage})
    return "got all contacts successfully"
}

const updateContact = async (req,resp) => {
   
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username","contactName"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfUser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {propertyTobeUpdated,value} = req.body
    const contactName = req.params.contactName

    const [isUpdated,UpdatedContact,message] = await selfUser.updateContact(contactName,propertyTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send({"data":UpdatedContact,"message":message})
        return message
    } 
    resp.status(200).send({"data":UpdatedContact,"message":message})
    return message
}

const deleteContact = async (req,resp) => { 

    const missingInput = checkForRequiredInputs(req,requiredBodyInput=[] ,requiredParamsInput=["username","contactName"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isSelfUser,selfPayload,selfUser] = await JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const contactName = req.params.contactName
    const [isDeleted,message] = await selfUser.deleteContact(contactName)
    if(!isDeleted){
        resp.status(500).send({"message":message})
        return message
    }
    resp.status(200).send({"message":message})
    return message
}

module.exports = {createContact, getAllContacts, updateContact, deleteContact}