const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const createUser = async (req, resp) => {

    const [isAdmin,adminPayload,admin] = await JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const {lastname,firstname,username,password,role} = req.body

    const missingInput = checkForRequiredInputs(req,["lastname","firstname","username","password","role"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [newUser,message] = await admin.createUser(firstname, lastname, username, password, role)
    if(!newUser){
        resp.status(500).send({"message":message})
        return
    }
    resp.status(201).send({"data":newUser,"message":message})
    return
}

const getAllUser = async(req, resp) => {
    const [isAdmin,adminPayload,admin] = await JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
      
    const {limit,page} =  req.query
    const [length,currentPage] =  await admin.getAllUserObjects(limit,page)
    resp.status(200).send({"length":length,"data":currentPage})
}

const getUser = async (req, resp) => {
    const [isAdmin,AdminPayload,admin] = await JwtPayload.isValidAdmin(req, resp)

    const [selfUser,SelfPayload,messageOfSelfUser] = await JwtPayload.isValidSelfUser(req, resp)

    if (!isAdmin) {
        return "unauthorized access"
    }

    const [user,messgeOfUser] = await User.findUserInAll(req.params.username)
    if(!user){
        resp.status(404).send({"message":"user not exist"}) 
    } 
    if(user.role=="Admin"){
        if(!selfUser){
            resp.status(401).send({"message":"admin cannot get other admin"})     
        }
    }
    resp.status(200).send({"data":user,"message":"user fetched"})
}

const updateUser = async (req, resp) => {
    const [iSAdminOrSelf,adminOrSelfPayload,user] = await JwtPayload.isValidAdminOrSelf(req, resp)
    if (!iSAdminOrSelf) {
        return "unauthorized access"
    }
    const {username,propertyTobeUpdated,value} = req.body
    const missingInput = checkForRequiredInputs(req,["propertyTobeUpdated","value"],["username"])  
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }

    const [isUpdated, UpdatedUser] = await user.updateUser(propertyTobeUpdated, value)
    if (!isUpdated) {
        resp.status(500).send({"message":"user not updated"})
        return "internal error"
    }
    resp.status(200).send({"data":UpdatedUser,"message":"user updated successfully"})
    return "updated successfully"
}
const deleteUser = async (req, resp) => {

    const [isAdminOrSelf,adminOrSelfPayload,user] = await JwtPayload.isValidAdminOrSelf(req, resp)
    if (!isAdminOrSelf) {
        return "unauthorized access"
    }
    const isDeleted = user.deleteUser()

    if(!isDeleted){
        resp.status(500).send({"message":"not deleted"})
        return "no deleted"
    }
    resp.status(200).send({"message":"user deleted successfully"})
    return "deleted successfully"
}

module.exports = { createUser, getAllUser, getUser ,updateUser, deleteUser }