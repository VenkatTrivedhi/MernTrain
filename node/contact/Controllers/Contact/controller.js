const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")

const createContact = (req,resp)=>{
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,firstname,lastname} = req.body
    const [isContactCreated,newContact,message] = User.allUsers[indexOfSelfUser].createContact(firstname,lastname)
    if(!isContactCreated){
        resp.status(500).send(message)
        return message
    }
    resp.status(201).send(newContact)
    return message
}

const getAllContacts = (req,resp) => {
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    resp.status(200).send(User.allUsers[indexOfSelfUser].contacts)
    return "got all contacts successfully"
}

const updateContact = (req,resp) => {
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,contactName,propertTobeUpdated,value} = req.body

    const [isUpdated,UpdatedContact,message] = User.allUsers[indexOfSelfUser].updateContact(contactName,propertTobeUpdated,value)
    if(!isUpdated){
        resp.status(500).send(message)
        return message
    } 
    resp.status(200).send(UpdatedContact)
    return message
}

const deleteContact = (req,resp) => { 
    const [isSelfUser,Payload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return "unauthorized access"
    }
    const {username,contactName} = req.body
   
    const [isDeleted,message] = User.allUsers[indexOfSelfUser].deleteContact(contactName)
    if(!isDeleted){
        resp.status(500).send(message)
        return message
    }
    resp.status(200).send(message)
    return message
}

module.exports = {createContact, getAllContacts, updateContact, deleteContact}