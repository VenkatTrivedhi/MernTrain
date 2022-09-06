class Numbers{
    constructor(number1,number2){
        this.number1=number1
        this.number2=number2
        this.sum = number1+number2
    }
}
const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
app.use(bodyParser.json())
app.use(cors())

app.post("/addition",(req,resp)=>{
    console.log("HERE")
const newNumbers = new Numbers(req.body.number1,req.body.number2)
resp.status(200).send(newNumbers)
})
app.listen(9000,()=>{
    console.log(
        "Started at 9000"
    )
})