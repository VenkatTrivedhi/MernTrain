const Jwt = require("jsonwebtoken")
const User = require("./user")

class JwtPayload{
    static secret = "123abc"

    constructor(user){
        this.username = user.credential.username
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
            resp.status(401).send("login required")
            return [false,null,-1]
        }
        const newPayload = JwtPayload.verifyCookies(myToken)
        if(newPayload.role!="Admin"){
            resp.status(403).send("Admin only have access")
            return [false,null,-1]
        }
        const [indexOfAdmin, isUserExist] = User.findUser(newPayload.username) 
        if(!isUserExist){
            resp.clearCookie("mytoken")
            resp.status(401).send("login required")
            return [false,null,-1]
        }
        return [true,newPayload,indexOfAdmin]
    }

    static isValidAdminOrSelf(req,resp){
        const myToken = req.cookies["mytoken"]
        if(!myToken){
            resp.status(401).send("login required")
            return [false,null,-1]
        }
        const newPayload = JwtPayload.verifyCookies(myToken)

        const username = req.params.username
        let isAdminOrSelf = newPayload.role=="Admin"|| newPayload.username==username
        if(!isAdminOrSelf){
            resp.status(403).send("User not permitted")
            return [false,null,-1]
        }
        // checking whether authenticated user deleted
        const [indexOfUser, isUserExist] = User.findUser(username)
        if(!isUserExist){
            resp.status(403).send("User does not exist")
            return [false,null,-1]
        }
        return [true,newPayload,indexOfUser]
    }

    static isValidUser(req,resp){
        const myToken = req.cookies["mytoken"]
        if(!myToken){
            resp.status(401).send("login required")
            return [false,null,-1]
        }
        const newPayload = JwtPayload.verifyCookies(myToken)
        const [indexOfUser, isUserExist] = User.findUser(newPayload.username)
        if(!isUserExist){
            resp.status(403).send("user not allowed")
            return [false,null,-1]
        }
        if(User.allUsers[indexOfUser].isActive!=true){
            resp.status(403).send("user not allowed")
            return [false,null,-1]
        }
        return [true,newPayload,indexOfUser]
    }
    static loggedInUser(req,resp){
        const myToken = req.cookies["mytoken"]
        if(!myToken){
            resp.status(200).send(null)
            return [false,null,-1]
        }
        const newPayload = JwtPayload.verifyCookies(myToken)
        const [indexOfUser, isUserExist] = User.findUser(newPayload.username)
        if(!isUserExist){
            resp.status(200).send(null)
            return [false,null,-1]
        }
        if(User.allUsers[indexOfUser].isActive!=true){
            resp.status(200).send(null)
            return [false,null,-1]
        }
        return [true,newPayload,indexOfUser]
    }

    static isValidSelfUser(req,resp){
        const myToken = req.cookies["mytoken"]
        
        if(!myToken){
            resp.status(401).send("login required")
            return [false,null,-1]
        }

        const newPayload = JwtPayload.verifyCookies(myToken)

        if(newPayload.username!=req.params["username"]){
            resp.status(403).send("User not permited")
            return [false,null,-1]
        }
        
        const [indexOfUser, isUserExist] = User.findUser(req.params["username"])

        if(!isUserExist){
            resp.status(403).send("User not permited")
            return [false,null,-1]
        }
        return [true,newPayload,indexOfUser]
    }
}

module.exports = JwtPayload