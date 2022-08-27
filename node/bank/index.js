const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const uuid= require("uuid")
const JwtPayLoad = require("./Views/jwtPayLoad")

const login = require("./Controller/Login/controller")
const logout = require("./Controller/Logout/controller")
const creatCustomer = require("./Controller/Customer/controller")
const {createBank, getAllBanks} = require("./Controller/Bank/controller")
const {creatAccount,getAllAccountsOfCustomer}=require("./Controller/Account/controller")
const {withdraw,deposit,transfer,selfTransfer} = require("./Controller/Transactions/controller")
const Adminlogin = require("./Controller/Admin/controller")


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.post("/api/v1/adminlogin",(req,resp)=>Adminlogin(req,resp))
app.post("/api/v1/login",(req,resp)=>login(req,resp))
app.post("/api/v1/logout",(req,resp)=>logout(req,resp))

app.post("/api/v1/createCustomer",(req,resp)=>creatCustomer(req,resp))

app.post("/api/v1/createBank",(req,resp)=>createBank(req,resp))
app.get("/api/v1/getAllBanks",(req,resp)=>getAllBanks(req,resp))

app.post("/api/v1/createAccount",(req,resp)=>creatAccount(req,resp))
app.get("/api/v1/getAllAccountsOfCustomer",(req,resp)=>getAllAccountsOfCustomer(req,resp))

app.post("/api/v1/withdraw",(req,resp)=>withdraw(req,resp))
app.post("/api/v1/deposit",(req,resp)=>deposit(req,resp))
app.post("/api/v1/transfer",(req,resp)=>transfer(req,resp))
app.post("/api/v1/selfTransfer",(req,resp)=>selfTransfer(req,resp))

//server
app.listen(8000,()=>{
    console.log("server running at 8000")
})