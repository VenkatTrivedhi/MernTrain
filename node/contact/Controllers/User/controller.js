const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")
const paginater = require("../../Views/paginater")

const createUser = async (req, resp) => { 
    const [isAdmin,Payload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const {lastname,firstname,username,password,role} = req.body
    const missingInput = checkForRequiredInputs(req,["lastname","firstname","username","password","role"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const admin = User.allUsers[indexOfAdmin]
    const [newUser,message] = await admin.createUser(firstname, lastname, username, password, role)
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
    
    const {limit,page} =  req.query
    const data = User.allUsers.filter(User=>User.role=="User")
    let currentPage = paginater(data,limit,page) 
    resp.status(200).send({"length":data.length,"data":currentPage})
}

const getUser = (req, resp) => {
    const [isAdmin,AdminPayload,indexOfAdmin] = JwtPayload.isValidAdmin(req, resp)
    const [isSelfUser,SelfPayload,indexOfSelfUser] = JwtPayload.isValidSelfUser(req, resp)

    if (!isAdmin) {
        return "unauthorized access"
    }

    const [indexOfUser,isUserExist] =User.findUserInAll(req.params.username)
    if(!isUserExist){
        resp.status(404).send("user not exist") 
    } 
    if(User.allUsers[indexOfUser].role=="Admin"){
        if(!isSelfUser){
            resp.status(401).send("admin cannot get other admin")     
        }
    }
    resp.status(200).send(User.allUsers[indexOfUser])
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

module.exports = { createUser, getAllUser, getUser ,updateUser, deleteUser }