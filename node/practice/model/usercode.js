/*const express = require("express")
const cors  = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const User = require("./user") 


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.post("/api/v1/addition",(req,resp)=>{
    const number1 = req.body.number1
    const number2 = req.body.number2
    let sum = number1+number2
    resp.status(200).send(
        {
            number1:number1,
            number2:number2,
            sum:sum
        }
    )
})
app.post("/api/v1/createuser",(req,resp)=>{
    const lastname = req.body.firstname
    const firstname = req.body.lastname
    const age = req.body.age

    const newUser = new User(firstname,lastname,age)
    User.allUser.push(newUser)
    resp.status(200).send(newUser)
})

app.get("/api/v1/getalluser",(req,resp)=>{
    resp.status(200).send(User.allUser)
})

app.listen(8000,()=>{
    console.log("server running at 8000")
}) */