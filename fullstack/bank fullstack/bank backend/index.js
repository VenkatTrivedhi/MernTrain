const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const uuid= require("uuid")
const JwtPayLoad = require("./Views/jwtPayLoad")

const {login,loggedInUser} = require("./Controller/Login/controller")
const logout = require("./Controller/Logout/controller")
const { createUser, getAllUser, getUser ,updateUser, deleteUser ,getBalance } = require("./Controller/User/controller")
const {withdraw,deposit,transfer,getAllTransactions} = require("./Controller/Transactions/controller")
const {roles,limitOfPage,getAllUsernames} = require("./Controller/Options/controller")


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

app.post("/api/v1/login",(req,resp)=>login(req,resp))
app.post("/api/v1/logout",(req,resp)=>logout(req,resp))

app.post("/api/v1/createUser",(req,resp)=>createUser(req,resp))

app.post("/api/v1/withdraw/:username",(req,resp)=>withdraw(req,resp))
app.post("/api/v1/deposit/:username",(req,resp)=>deposit(req,resp))
app.post("/api/v1/transfer/:username",(req,resp)=>transfer(req,resp))
app.get("/api/v1/getAllTransactions/:username",(req,resp)=>getAllTransactions(req,resp))
app.get("/api/v1/loggedInUser",async (req, resp) => await loggedInUser(req, resp))

app.get("/api/v1/roles", async (req, resp) => await roles(req, resp))
app.get("/api/v1/limitOfPage",async (req, resp) => await limitOfPage(req, resp))
app.get("/api/v1/getAllUsernames/:username",async (req, resp) => await getAllUsernames(req, resp))
app.get("/api/v1/getBalance/:username",async (req, resp) => await getBalance(req, resp))

//server
app.listen(8000,()=>{
    console.log("server running at 8000")
})