const jwt = require("jsonwebtoken")

class JwtPayLoad{
    static secret = "123abc"
    constructor(customer){
        this.username = customer.credential.username
        this.fullName =  customer.fullName
        this.role = customer
    }

    createToken(){
        return jwt.sign(JSON.stringify(this),JwtPayLoad.secret)
    }

    static verifyToken(myToken){
        const Payload = jwt.verify(myToken,JwtPayLoad.secret)
        return Payload
    }

    static isValidCustomer(req,resp){
        const myToken = req.cookies["myBankToken"]
        if(!myToken){
            resp.status(401).send("login required")
            return [false,null]
        }
        const Payload = JwtPayLoad.verifyToken(myToken)
        if(!Payload.username==req.params.username){
            resp.status(403).send("invalid customer")
            return [false,null]
        }
        return [true,Payload]
    }

    static isValidAdmin(req,resp){
        const myToken = req.cookies["myBankToken"]
        if(!myToken){
            resp.status(401).send("login required")
            return [false,null]
        }
        const Payload = JwtPayLoad.verifyToken(myToken)
        if(Payload.role!="Admin"){
            resp.status(403).send("invalid customer")
            return [false,null]
        }
        return [true,Payload]
    }
    static isValidUser(){
        //it will have use
    }
}

module.exports = JwtPayLoad