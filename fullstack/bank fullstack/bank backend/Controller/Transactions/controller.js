const JwtPayLoad = require("../../Views/jwtPayLoad")
const User = require("../../Views/user")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")


const withdraw = async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["amount"],["username"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }
    const [isSelfUser,Payload,selfUser] = await JwtPayLoad.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return
    }
    const amount = req.body.amount 
    const [isWithdrawn,messageOfWithdraw,transaction] = await selfUser.withdraw(amount)
    if(!isWithdrawn){
        resp.status(500).send({"message":messageOfWithdraw,"transaction":transaction})
        return
    }
    resp.status(200).send({"message":messageOfWithdraw,"transaction":transaction})
}

const deposit = async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["amount"],["username"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }
    const [isSelfUser,Payload,selfUser] = await JwtPayLoad.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return
    }
    const amount = req.body.amount 
    const [isDeposited,messageOfDeposit,transaction] = await selfUser.deposit(amount)
    if(!isDeposited){
        resp.status(500).send({"message":messageOfDeposit,"transaction":transaction})
        return
    }
    resp.status(200).send({"message":messageOfDeposit,"transaction":transaction})
}

const transfer= async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["amount","creditUsername"],["username"])
    
    if(missingInput){
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }
    const [isSelfUser,Payload,selfUser] = await JwtPayLoad.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return
    }
    const amount = req.body.amount
    const creditUsername = req.body.creditUsername
    const [isTransfered,messageOfTransfer,transaction] = await selfUser.transfer(amount,creditUsername)
    if(!isTransfered){
        resp.status(500).send({"message":messageOfTransfer,"transaction":transaction})
        return
    }
    resp.status(200).send({"message":messageOfTransfer,"transaction":transaction})
}

const getAllTransactions = async(req,resp)=>{
    const missingInput = checkForRequiredInputs(req,requiredBodyInput=[] ,requiredParamsInput=["username"])
    if(missingInput){
   
        resp.status(401).send({"message":`${missingInput} is required`})
        return `${missingInput} is required`
    }
    const [isSelfUser,Payload,selfUser] = await JwtPayLoad.isValidSelfUser(req,resp)
    if(!isSelfUser){
        return
    }
    const page =  req.query.page
    const limit =  req.query.limit
    
    const [length,currentPage] = await selfUser.getAllTransactionsObjects(limit,page)
    resp.status(200).send({"length":length,"data":currentPage})
    return "got all contacts successfully"
}

module.exports = {withdraw,deposit,transfer,getAllTransactions}