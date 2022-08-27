const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const User = require("./Views/user")
const Contact = require("./Views/")
const ContactDetails = require("./Views/contactDetails")
const JwtPayload = require("./Views/JwtPayload")
const cookieParser = require("cookie-parser")

const login = require("./Controllers/Login/controller")
const logout = require("./Controllers/Logout/controller")
const { createUser, getAllUser, updateUser, deleteUser } = require("./Controllers/User/controller")
const { createTest, getAllTest,updateTest,deleteTest} = require("./Controllers/Test/controller")
const { createQuestion,updateQuestion,deleteQuestion} = require("./Controllers/Question/controller")


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//login/logout
app.post("/api/v1/login/", async (req, resp) => await login(req, resp))
app.post("/api/v1/logout", (req, resp) => logout(req, resp))

//User
app.post("/api/v1/createUser", async (req, resp) => await createUser(req, resp))
app.get("/api/v1/getAllUser", (req, resp) => getAllUser(req, resp))
app.put("/api/v1/updateUser/:username", (req, resp) => updateUser(req, resp))
app.delete("/api/v1/deleteUser/:username", (req, resp) => deleteUser(req, resp))

//Test
app.post("/api/v1/createTest", (req, resp) => createTest(req, resp))
app.get("/api/v1/getAllTest", (req, resp) => getAllTest(req, resp))
app.put("/api/v1/updateTest/:technology", (req, resp) => updateTest(req, resp))
app.delete("/api/v1/deleteTest/:technology", (req, resp) => deleteTest(req, resp))

//Question
app.put("/api/v1/createQuestion", (req, resp) => createQuestion(req, resp))
app.put("/api/v1/updateQuestion/:details", (req, resp) => updateQuestion(req, resp))
app.delete("/api/v1/deleteQuestion", (req, resp) => deleteQuestion(req, resp))

app.post("/api/v1/createContactDetails/:username/:contactName", (req, resp) => createContactDetails(req, resp))

//server
app.listen(8000, () => {
    console.log("server running at 8000")
})

