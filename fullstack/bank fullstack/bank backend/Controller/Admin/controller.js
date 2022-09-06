const User = require("../../Views/user")
const JwtPayLoad = require("../../Views/jwtPayLoad")
const checkForRequiredInputs = require("../../Views/checkForRequiredInputs")

const Adminlogin= async (req,resp)=>{
    const missingInput = checkForRequiredInputs(req,["username","password"])
    if(missingInput){
        resp.status(401).send(`${missingInput} is required`)
        return `${missingInput} is required`
    }
    const {username,password} = req.body
    const [isValidCustomer ,indexOfCustomer, message] = await Customer.validateSuperUser(username,password)
    if(!isValidCustomer){
        resp.status(401).send(message)
        return
    }
    const newPayLoad= new JwtPayLoad(Customer.superUser)
    const newToken = newPayLoad.createToken()
    resp.cookie("myBankToken",newToken).status(200).send("Successfully logged in")
}

module.exports = Adminlogin