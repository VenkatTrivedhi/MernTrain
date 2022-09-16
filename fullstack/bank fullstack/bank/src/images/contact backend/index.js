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
const {roles,limitOfPage} = require("./Controllers/Options/controller")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//dropdown option
app.get("/api/v1/roles", async (req, resp) => await roles(req, resp))
app.get("/api/v1/limitOfPage",async (req, resp) => await limitOfPage(req, resp))

//login/logout
app.post("/api/v1/login", async (req, resp) => await login(req, resp))
app.get("/api/v1/loggedInUser",async (req, resp) => await loggedInUser(req, resp))
app.post("/api/v1/logout", (req, resp) => logout(req, resp))
//user
app.post("/api/v1/createUser", async (req, resp) => await createUser(req, resp))
app.get("/api/v1/getAllUser", async (req, resp) => await getAllUser(req, resp))
app.get("/api/v1/getUser/:username", async(req, resp) => await getUser(req, resp))
app.put("/api/v1/updateUser/:username", async(req, resp) => await updateUser(req, resp))
app.delete("/api/v1/deleteUser/:username", async(req, resp) => await deleteUser(req, resp))
//contact
app.post("/api/v1/createContact/:username", async(req, resp) => await createContact(req, resp))
app.get("/api/v1/getAllContacts/:username", async(req, resp) => await getAllContacts(req, resp))

app.put("/api/v1/updateContact/:username/:contactName", async(req, resp) => await updateContact(req, resp))
app.delete("/api/v1/deleteContact/:username/:contactName", async(req, resp) => await deleteContact(req, resp))
//contactDetails
app.post("/api/v1/createContactDetails/:username/:contactName", async(req, resp) => await createContactDetails(req, resp))
app.put("/api/v1/updateContactDetails/:username/:contactName/:type", async(req, resp) => await updateContactDetails(req, resp))
app.delete("/api/v1/deleteContactDetails/:username/:contactName/:type", async(req, resp) => await deleteContactDetails(req, resp))

//server
app.listen(8000, () => {
    console.log("server running at 8000")
})

