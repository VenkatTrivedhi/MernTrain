const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const uuid = require("uuid")
const User = require("./Views/user")
const Contact = require("./Views/contact")
const ContactDetails = require("./Views/contactDetails")
const JwtPayload = require("./Views/JwtPayload")
const cookieParser = require("cookie-parser")

const {login,loggedInUser} = require("./Controllers/Login/controller")
const logout = require("./Controllers/Logout/controller")
const { createUser, getAllUser, getUser ,updateUser, deleteUser } = require("./Controllers/User/controller")
const { createContact, getAllContacts , updateContact, deleteContact } = require("./Controllers/Contact/controller")
const {createContactDetails,updateContactDetails,deleteContactDetails} = require("./Controllers/ContactDetails/controller")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//login/logout
app.post("/api/v1/login", async (req, resp) => await login(req, resp))
app.get("/api/v1/loggedInUser", (req, resp) => loggedInUser(req, resp))
app.post("/api/v1/logout", (req, resp) => logout(req, resp))
//user
app.post("/api/v1/createUser", async (req, resp) => await createUser(req, resp))
app.get("/api/v1/getAllUser", (req, resp) => getAllUser(req, resp))
app.get("/api/v1/getUser/:username", (req, resp) => getUser(req, resp))
app.put("/api/v1/updateUser/:username", (req, resp) => updateUser(req, resp))
app.delete("/api/v1/deleteUser/:username", (req, resp) => deleteUser(req, resp))
//contact
app.post("/api/v1/createContact/:username", (req, resp) => createContact(req, resp))
app.get("/api/v1/getAllContacts/:username", (req, resp) => getAllContacts(req, resp))

app.put("/api/v1/updateContact/:username/:contactName", (req, resp) => updateContact(req, resp))
app.delete("/api/v1/deleteContact/:username/:contactName", (req, resp) => deleteContact(req, resp))
//contactDetails
app.post("/api/v1/createContactDetails/:username/:contactName", (req, resp) => createContactDetails(req, resp))
app.put("/api/v1/updateContactDetails/:username/:contactName/:type", (req, resp) => updateContactDetails(req, resp))
app.delete("/api/v1/deleteContactDetails/:username/:contactName/:type", (req, resp) => deleteContactDetails(req, resp))

//server
app.listen(8000, () => {
    console.log("server running at 8000")
})

