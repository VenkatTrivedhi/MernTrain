const express = require("express")
const cors  = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const User = require("./model/user")
const Contact = require("./model/contact")
const ContactDetails = require("./model/contactDetails")
const JwtPayload = require("./model/JwtPayload")
const cookieParser = require("cookie-parser")


const app = express()

const  [admin,message] = User.createAdmin("your","name","admin","admin123")

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//login/logout
app.post("/api/v1/login",(req,resp)=>{
    const username = req.body.username
    const password = req.body.password
    
    let [indexOfUser,isUsernameExist] = User.findUser(username)
    if(!isUsernameExist){
        resp.status(504).send("invalid credential")
    }
    if(User.allUsers[indexOfUser].credential.password!=password){
        resp.status(504).send("invalid credential")
    }
    const newPayload = new JwtPayload(User.allUsers[indexOfUser])
    const newToken =  newPayload.createtoken()
    resp.cookie("mytoken",newToken)
    resp.status(200).send("login done")
})
app.post("/api/v1/logout",(req,resp)=>{
    resp.clearCookie("mytoken").send("signed out successfully")
})

//user
app.post("/api/v1/createUser",(req,resp)=>{
    const isAdmin =  JwtPayload.isValidAdmin(req,resp)
    if(!isAdmin){
        return "unauthorized access"
    }
    const lastname = req.body.firstname
    const firstname = req.body.lastname
    const username = req.body.username
    const password = req.body.password
    const role = req.body.role

    const newUser = admin.createUser(firstname,lastname,username,password,role)
    resp.status(200).send(newUser)
})

app.get("/api/v1/getAllUser",(req,resp)=>{
    const isAdmin =  JwtPayload.isValidAdmin(req,resp)
    if(!isAdmin){
        return "unauthorized access"
    }
    resp.status(200).send(User.allUsers)
})

app.put("/api/v1/updateUser",(req,resp)=>{
    const isAdmin =  JwtPayload.isValidAdmin(req,resp)
    if(!isAdmin){
        return "unauthorized access"
    }

    const username = req.body.username
    const propertTobeUpdated = req.body.propertyTobeUpdated
    const value = req.body.value

    const [indexOfUser,isUserExist] = User.findUser(username)
    if(!isUserExist){
        return "invalid username"
    }

    const [isUpdated,UpdatedUser] = User.allUsers[indexOfUser].updateUser(propertTobeUpdated,value)
    if(!isUpdated){
        resp.status(200).send("user not updated")
    }
    resp.status(200).send(UpdatedUser)
})

app.delete("/api/v1/deleteUser",(req,resp)=>{
    const isAdmin =  JwtPayload.isValidAdmin(req,resp)
    if(!isAdmin){
        return "unauthorized access"
    }
    const username = req.body.username
    const [indexOfUser,isUserExist] = User.findUser(username)
    if(!isUserExist){
        return "invalid username"
    }

    User.allUsers[indexOfUser].deleteUser()
    resp.status(200).send("user deleted successfully")
})


//contact
app.post("/api/v1/createContact",(req,resp)=>{
    const isUser =  JwtPayload.isValidUser(req,resp)
    if(!isUser){
        return "unauthorized access"
    }
    const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname

    const [indexOfUser,isUserExist] = User.findUser(username)
    if(!isUserExist){
        resp.status(504).send("invalid username")
    }
    const newContact = User.allUsers[indexOfUser].createContact(firstname,lastname)
    resp.status(200).send(newContact)
})

app.get("/api/v1/getAllContacts",(req,resp)=>{
    const isUser =  JwtPayload.isValidUser(req,resp)
    if(!isUser){
        return "unauthorized access"
    }
    const username = req.body.username
    const [indexOfUser,isUserExist] = User.findUser(username)
    if(!isUserExist){
        return "invalid username"
    }

    resp.status(200).send(User.allUsers[indexOfUser].contacts)
})

app.put("/api/v1/updateContact",(req,resp)=>{
    const isUser =  JwtPayload.isValidUser(req,resp)
    if(!isUser){
        return "unauthorized access"
    }
    const username = req.body.username
    const contactName = req.body.contactName
    const propertTobeUpdated = req.body.propertyTobeUpdated
    const value = req.body.value

    const [indexOfUser,isUserExist] = User.findUser(username)
    if (!isUserExist){
        resp.status(504).send("invalid username")
    }
    const [isUpdated,UpdatedContact,message] = User.allUsers[indexOfUser].updateContact(contactName,propertTobeUpdated,value)
    if(!isUpdated){
        resp.status(504).send(message)
    } 
    resp.status(200).send(UpdatedContact)
})

app.delete("/api/v1/deleteContact",(req,resp)=>{
    const isUser =  JwtPayload.isValidUser(req,resp)
    if(!isUser){
        return "unauthorized access"
    }
 
    const username = req.body.username
    const contactName = req.body.contactName

    const [indexOfUser,isUserExist] = User.findUser(username)
    if (!isUserExist){
        resp.status(504).send("invalid username")
    }
    const [isDeleted,message] = User.allUsers[indexOfUser].deleteContact(contactName)
    if(!isDeleted){
        resp.status(504).send(message)
    }
    resp.status(200).send(message)
})

//server
app.listen(8000,()=>{
    console.log("server running at 8000")
})