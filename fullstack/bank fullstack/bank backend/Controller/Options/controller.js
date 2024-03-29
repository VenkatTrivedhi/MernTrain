const Roles=require("../../Views/role")
const JwtPayLoad = require("../../Views/jwtPayLoad")


const roles=async (req,resp)=>{
    const [data,message] = await Roles.getAllRoles()
    resp.status(200).send({"data":data,"message":message})
}

const limitOfPage=async(req,resp)=>{
    resp.status(200).send({"data":[3,5,10,20,30,40,50]})
}

const getAllUsernames=async(req,resp)=>{
    const [isSelfUser,Payload,selfUser] = await JwtPayLoad.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return
    }

    const listOfUsernames = await selfUser.getAllUsernames()
    resp.status(200).send({"data":listOfUsernames})
}

module.exports = {roles,limitOfPage,getAllUsernames}