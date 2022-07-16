const express = require("express")
const cors  = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const User = require("./model/user")
const Contact = require("./model/contact")
const ContactDetails = require("./model/contactDetails")

const app = express()

const  admin = new User("your","admin","admin","Admin")

app.use(cors())
app.use(bodyParser.json())

app.post("/api/v1/createuser",(req,resp)=>{
    const lastname = req.body.firstname
    const firstname = req.body.lastname
    const username = req.body.username
    const role =req.body.role

    const newUser = admin.createUser(firstname,lastname,username,role)
    resp.status(200).send(newUser)
})

app.get("/api/v1/getalluser",(req,resp)=>{
    resp.status(200).send(User.all_users)
})

app.put("/api/v1/updateuser",(req,resp)=>{
    const username = req.body.username
    const propertTobeUpdated = req.body.propertyTobeUpdated
    const value = req.body.value

    [isUserExist,currentUser] = User.findUser(username)
    if(!isUserExist){
        return
    }
    currentUser.update(propertTobeUpdated,value)
    resp.status(200).send()
})
app.listen(8000,()=>{
    console.log("server running at 8000")
})