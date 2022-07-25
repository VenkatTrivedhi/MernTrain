const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")


const createUser = async (req, resp) => {
    const [isAdmin,Payload,indexOfUser] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }

    const admin = User.allUsers[indexOfUser]
    const {lastname,firstname,username,password,role} = req.body

    const newUser = await admin.createUser(firstname, lastname, username, password, role)
    resp.status(201).send(newUser)
}

const getAllUser = (req, resp) => {
    const [isAdmin,Payload,indexOfUser] = JwtPayload.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    resp.status(200).send(User.allUsers)
}

const updateUser = (req, resp) => {
    const [isAdminOrSelf,Payload,indexOfUser] = JwtPayload.isValidAdminOrSelf(req, resp)
    if (!isAdminOrSelf) {
        return "unauthorized access"
    }
    const {username,propertTobeUpdated,value} = req.body

    const [isUpdated, UpdatedUser] = User.allUsers[indexOfUser].updateUser(propertTobeUpdated, value)
    if (!isUpdated) {
        resp.status(500).send("user not updated")
        return "internal error"
    }
    resp.status(200).send(UpdatedUser)
    return "updated successfully"
}
const deleteUser = (req, resp) => {

    const [isAdminOrSelf,Payload,indexOfUser] = JwtPayload.isValidAdminOrSelf(req, resp)
    if (!isAdminOrSelf) {
        return "unauthorized access"
    }

    User.allUsers[indexOfUser].deleteUser()
    resp.status(200).send("user deleted successfully")
    return "deleted successfully"
}

module.exports = { createUser, getAllUser, updateUser, deleteUser }