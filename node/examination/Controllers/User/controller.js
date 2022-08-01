const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const {checkForRequiredInputs} = require("../../Views/inputValidaters")
const paginater = require("../../Views/paginater")


const createUser = async (req, resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const {username, password, firstname, lastname,role,experience,frontend,backend,database,country} = req.body
    const missingInput = checkForRequiredInputs(req,["lastname","firstname","username","password","role","experience","frontend","backend","database","country"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const admin = User.allUsers[indexOfAdmin]
    const [newUser,message] = await admin.createUser(firstname, lastname, username, password, role,experience,frontend,backend,database,country)
    if(!newUser){
        resp.status(500).send(message)
        return
    }
    resp.status(201).send(newUser)
    return
}

const getAllUser = (req, resp) => {
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    const missingInput = checkForRequiredInputs(req,[],["limit","page"])
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {limit,page} =  req.params
    let currentPage = paginater(User.allUsers,limit,page)
    resp.status(200).send(currentPage)
}

const updateUser = (req, resp) => {
    const [isAdminOrSelf,Payload,indexOfUserTobeUpdated] = JwtPayload.isValidAdminOrSelf(req, resp)
    if (!isAdminOrSelf) {
        return "unauthorized access"
    }
    const {username,propertyTobeUpdated,value} = req.body
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username"])  
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isUpdated, UpdatedUser] = User.allUsers[indexOfUserTobeUpdated].updateUser(propertyTobeUpdated, value)
    if (!isUpdated) {
        resp.status(500).send("user not updated")
        return "internal error"
    }
    resp.status(200).send(UpdatedUser)
    return "updated successfully"
}
const deleteUser = (req, resp) => {

    const [isAdminOrSelf,Payload,indexOfUserTobeUpdated] = JwtPayload.isValidAdminOrSelf(req, resp)
    if (!isAdminOrSelf) {
        return "unauthorized access"
    }

    const isDeleted = User.allUsers[indexOfUserTobeUpdated].deleteUser()

    if(!isDeleted){
        resp.status(500).send("not deleted")
        return "no deleted"
    }
    resp.status(200).send("user deleted successfully")
    return "deleted successfully"
}

module.exports = { createUser, getAllUser, updateUser, deleteUser }