const Jwt = require("jsonwebtoken")

class JwtPayload{
    static secret = "123abc"
    constructor(user){
        this.username = user.credential.username
        this.password = user.credential.password
        this.role = user.role
        this.firstName = user.firstname
        this.isActive = user.isActive
    }

    createtoken(){
        return Jwt.sign(JSON.stringify(this),JwtPayload.secret)
    }
    
    static verifyCookies(cookie){        
        const Payload = Jwt.verify(cookie,JwtPayload.secret)
        return Payload
    }

    static isValidAdmin(req,resp){
        const myToken = req.cookies["mytoken"]
        if(!myToken){
            resp.status(200).send("login required")
            return false
        }

        const newPayload = JwtPayload.verifyCookies(myToken)
        if(newPayload.role!="Admin"){
            resp.status(200).send("Admin only have access")
            return false
        }
        return true
    }

    static isValidUser(req,resp){
        const myToken = req.cookies["mytoken"]
        if(!myToken){
            resp.status(200).send("login required")
            return false
        }
        const newPayload = JwtPayload.verifyCookies(myToken)
        if(newPayload.isActive!=true){
            resp.status(200).send("invalid user")
            return false
        }
        return true
    }
}

module.exports = JwtPayload