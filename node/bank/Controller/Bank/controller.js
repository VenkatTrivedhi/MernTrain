const Bank = require("../../Views/bank")
const JwtPayLoad = require("../../Views/jwtPayLoad")
const Customer = require("../../Views/customer")

const createBank=(req,resp)=>{
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