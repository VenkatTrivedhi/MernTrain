const JwtPayLoad = require("../../Views/jwtPayLoad")
const Customer = require("../../Views/customer")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const creatAccount = (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["type","value"],["username","contactName"])
    
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }

    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    const bankAbbrevation = req.body.bankAbbrevation
    const [isCreated,newAccount,messageOfAccount] = Customer.allCustomer[indexOfcustomer].creatAccount(bankAbbrevation)
    if(!isCreated){
        resp.status(500).send(messageOfAccount)
        return
    }
    resp.status(201).send(newAccount)
    return
}

const getAllAccountsOfCustomer = (req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return 
    }
    const [indexOfCustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    resp.status(200).send(Customer.allCustomer[indexOfCustomer].accounts)
    return
}

module.exports = {creatAccount,getAllAccountsOfCustomer}