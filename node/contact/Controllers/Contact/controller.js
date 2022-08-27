const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")
const paginater = require("../../Views/paginater")

const createContact = (req,resp)=>{
    const {firstname,lastname} = req.body
    const missingInput = checkForRequiredInputs(req,["firstname","lastname"],["username"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }

    const [isContactCreated,newContact,message] = User.allUsers[indexOfSelfUser].createContact(firstname,lastname)
    if(!isContactCreated){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(newContact)
    return message
}

const getAllContacts = (req,resp) => {
    console.log("controller hitted")
    const missingInput = checkForRequiredInputs(req,requiredBodyInput=[] ,requiredParamsInput=["username"])
    if(missingInput){
   
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
      
        return "unauthorized access"
    }

    const {limit,page} =  req.query
    let currentPage = paginater(User.allUsers[indexOfSelfUser].contacts,limit,page)
    resp.status(200).send(currentPage)
    return "got all contacts successfully"
}

const updateContact = (req,resp) => {
   
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username","contactName"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {propertyTobeUpdated,value} = req.body
    const contactName = req.params.contactName

    const [isUpdated,UpdatedContact,message] = User.allUsers[indexOfSelfUser].updateContact(contactName,propertyTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send(message)
        return message
    } 
    resp.status(200).send(UpdatedContact)
    return message
}

const deleteContact = (req,resp) => { 

    const missingInput = checkForRequiredInputs(req,requiredBodyInput=[] ,requiredParamsInput=["username","contactName"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const contactName = req.params.contactName
    const [isDeleted,message] = User.allUsers[indexOfSelfUser].deleteContact(contactName)
    if(!isDeleted){
        resp.status(500).send(message)
        return message
    }
    resp.status(200).send(message)
    return message
}

module.exports = {createContact, getAllContacts, updateContact, deleteContact}