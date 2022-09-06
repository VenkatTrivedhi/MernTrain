const Roles=require("../../Views/role")

const roles=async (req,resp)=>{
    const [data,message] = await Roles.getAllRoles()
    resp.status(200).send({"data":data,"message":message})
}

const limitOfPage=async(req,resp)=>{
    resp.status(200).send({"data":[3,5,10,20,30,40,50]})
}

module.exports = {roles,limitOfPage}