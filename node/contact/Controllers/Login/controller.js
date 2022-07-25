const User = require("../../Views/user")
const JwtPayload = require("../..//Views/JwtPayload")

const login= async (req,resp) => {
    const username = req.body.username
    const password = req.body.password
    const [isValid,indexOfUser,message] = await User.validateCredential(username,password)
    if(!isValid){
        resp.status(401).send(message)
        return
    }
    const newPayload = new JwtPayload(User.allUsers[indexOfUser])
    const newToken =  newPayload.createtoken()
    resp.cookie("mytoken",newToken)
    resp.status(200).send("login done")
}

module.exports = login