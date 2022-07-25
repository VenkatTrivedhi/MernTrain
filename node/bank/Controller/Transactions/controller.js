const JwtPayLoad = require("../../Views/jwtPayLoad")
const Customer = require("../../Views/customer")

const withdraw = (req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    const {bankAbbrevation,amount} = req.body
    const [isWithdrawn,messageOfWithdraw] = Customer.allCustomer[indexOfcustomer].withdraw(amount,bankAbbrevation)
    if(!isWithdrawn){
        resp.status(500).send(messageOfWithdraw)
        return
    }
    resp.status(200).send(messageOfWithdraw)
}

const deposit = (req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    const {bankAbbrevation,amount} = req.body
    const [isDepositSuccess,messageOfDepisit] = Customer.allCustomer[indexOfcustomer].deposit(amount,bankAbbrevation)
    if(!isDepositSuccess){
        resp.status(500).send(messageOfDepisit)
        return
    }
    resp.status(200).send(messageOfDepisit)
    return
}

const transfer=(req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    const {debitbankAbbrevation,amount,creditUserName,creditBankAbbrevation} = req.body
    let customer = Customer.allCustomer[indexOfcustomer]
    console.log(debitbankAbbrevation , amount,creditUserName ,creditBankAbbrevation)
    const [isTransfered,messageOfTransfer] = customer.transfer(amount,debitbankAbbrevation,creditUserName,creditBankAbbrevation)
    if(!isTransfered){
        resp.status(500).send(messageOfTransfer)
        return
    }
    resp.status(200).send(messageOfTransfer)
    return
}

const selfTransfer=(req,resp)=>{
    const [isValid,Payload] = JwtPayLoad.isValidCustomer(req,resp)
    if(!isValid){
        return
    }
    
    const [indexOfcustomer,isCustomerExist,message] = Customer.findCustomer(Payload.username)
    if(!isCustomerExist){
        resp.status(403).send(message)
        return
    }
    const {amount, debitBankAbbrevation, creditBankAbbrevation} = req.body
    console.log(amount,debitBankAbbrevation,creditBankAbbrevation)
    let customer = Customer.allCustomer[indexOfcustomer]
    const [isTransfered,messageOfTransfer] = customer.selfTransfer(amount,debitBankAbbrevation,creditBankAbbrevation)
    if(!isTransfered){
        resp.status(500).send(messageOfTransfer)
        return
    }
    resp.status(200).send(messageOfTransfer)
    return
}

module.exports = {withdraw,deposit,transfer,selfTransfer}