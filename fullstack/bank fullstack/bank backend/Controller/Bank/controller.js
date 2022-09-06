const Bank = require("../../Views/bank")
const JwtPayLoad = require("../../Views/jwtPayLoad")
const User = require("../../Views/user")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const createBank=(req,resp)=>{ 
    const [isAdmin,Payload,indexOfAdmin] = JwtPayLoad.isValidAdmin(req, resp)
    if (!isAdmin) {
        return "unauthorized access"
    }
    const missingInput = checkForRequiredInputs(req,["bankName","bankAbbrevation"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const {bankName,bankAbbrevation} =  req.body
    const [isCreated,newBank,message]=Bank.createBank(bankName,bankAbbrevation)
    if(!isCreated){
        resp.status(500).send(message)
        return
    }
    resp.status(201).send(newBank)
    return
}

const getAllBanks =(req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    resp.status(200).send(Bank.allBanks)  
}

module.exports = {createBank,getAllBanks}